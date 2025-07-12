// main.js
document.addEventListener('DOMContentLoaded', async () => {
    const connectButton = document.getElementById('connectButton');
    const walletConnectButton = document.getElementById('walletConnectButton');

    if (connectButton) {
        connectButton.addEventListener('click', async () => {
            await connectWalletAndUpdateUI('metamask');
        });
    }
    
    if (walletConnectButton) {
        walletConnectButton.addEventListener('click', async () => {
            await connectWalletAndUpdateUI('walletconnect');
        });
    }
    
    // === اضافه کردن دکمه مخفی پنل اونر به منوی همبرگری ===
    try {
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        if (hamburgerMenu && window.contractConfig && window.contractConfig.contract && window.contractConfig.address) {
            // گرفتن آدرس owner از قرارداد
            const ownerAddress = await window.contractConfig.contract.owner();
            const userAddress = window.contractConfig.address;
            // بررسی تطابق آدرس owner و کاربر
            if (ownerAddress && userAddress && ownerAddress.toLowerCase() === userAddress.toLowerCase()) {
                // اگر دکمه قبلاً اضافه نشده بود، اضافه کن
                if (!document.getElementById('owner-panel-btn')) {
                    const divider = document.createElement('div');
                    divider.className = 'menu-divider';
                    divider.id = 'owner-panel-divider'; // Added ID for removal
                    const btn = document.createElement('button');
                    btn.id = 'owner-panel-btn';
                    btn.innerHTML = '<span class="menu-icon">🛡️</span>پنل اونر';
                    btn.onclick = function() { window.location.href = 'admin-owner-panel.html'; };
                    btn.style.background = '#232946';
                    btn.style.color = '#a786ff';
                    btn.style.fontWeight = 'bold';
                    btn.style.display = 'block';
                    btn.style.border = '1px solid #a786ff';
                    btn.style.marginTop = '10px';
                    btn.style.padding = '10px';
                    btn.style.borderRadius = '8px';
                    btn.style.cursor = 'pointer';
                    // اضافه کردن به انتهای منو
                    hamburgerMenu.appendChild(divider);
                    hamburgerMenu.appendChild(btn);
                }
            }
        }
    } catch (e) { console.warn('Owner panel button error:', e); }

    // به‌روزرسانی ناوبار بر اساس وضعیت کاربر
    await updateNavbarBasedOnUserStatus();

    // کشبک داشبورد
    const cashbackValueEl = document.getElementById('dashboard-cashback-value');
    if (cashbackValueEl) {
        try {
            let cashback = await window.contractConfig.contract.cashBack();
            cashback = cashback.toString();
            cashbackValueEl.textContent = Number(cashback) / 1e18 + ' CPA';
            const cashbackDescEl = document.getElementById('dashboard-cashback-desc');
            if (cashbackDescEl) {
                cashbackDescEl.textContent = `۵٪ از هر ثبت‌نام به این صندوق اضافه می‌شود. مجموع فعلی: ${Number(cashback) / 1e18} CPA`;
            }
        } catch (e) {
            cashbackValueEl.textContent = '-';
            const cashbackDescEl = document.getElementById('dashboard-cashback-desc');
            if (cashbackDescEl) {
                cashbackDescEl.textContent = '۵٪ از هر ثبت‌نام به این صندوق اضافه می‌شود.';
            }
        }
    }
    await updateContractStats();
    // حذف مقداردهی مستقیم به dashboard-terminal-info برای جلوگیری از تداخل تایپ‌رایتر
    // if (document.getElementById('dashboard-terminal-info')) {
    //     document.getElementById('dashboard-terminal-info').textContent =
    //         `Total Points: ${window.contractStats.totalPoints}\n` +
    //         `USDC Balance: ${window.contractStats.usdcBalance}\n` +
    //         `Token Balance: ${window.contractStats.tokenBalance}\n` +
    //         `Wallets: ${window.contractStats.wallets}\n` +
    //         `Total Supply: ${window.contractStats.totalSupply}`;
    // }
});

function shortenAddress(address) {
    if (!address) return '---';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

function shorten(address) {
    if (!address) return '---';
    return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}

// تابع اضافه کردن دکمه owner به انتهای منوی همبرگری فقط برای owner
window.addOwnerPanelButtonIfOwner = async function() {
    try {
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        if (!hamburgerMenu) return;
        // حذف دکمه قبلی اگر وجود دارد
        const existingBtn = document.getElementById('owner-panel-btn');
        if (existingBtn) existingBtn.remove();
        // حذف divider قبلی اگر وجود دارد
        const existingDivider = document.getElementById('owner-panel-divider');
        if (existingDivider) existingDivider.remove();
        // بررسی اتصال و قرارداد
        if (!window.contractConfig || !window.contractConfig.contract || !window.contractConfig.address) return;
        // گرفتن owner از قرارداد
        let ownerAddress;
        try {
            ownerAddress = await window.contractConfig.contract.owner();
        } catch (e) { return; }
        const userAddress = window.contractConfig.address;
        if (!ownerAddress || !userAddress) return;
        if (ownerAddress.toLowerCase() !== userAddress.toLowerCase()) return;
        // اضافه کردن divider
        const divider = document.createElement('div');
        divider.className = 'menu-divider';
        divider.id = 'owner-panel-divider';
        // ایجاد دکمه
        const btn = document.createElement('button');
        btn.id = 'owner-panel-btn';
        btn.innerHTML = '<span class="menu-icon">🛡️</span>پنل اونر';
        btn.onclick = function() { window.location.href = 'admin-owner-panel.html'; };
        btn.style.background = '#232946';
        btn.style.color = '#a786ff';
        btn.style.fontWeight = 'bold';
        btn.style.display = 'block';
        btn.style.border = '1px solid #a786ff';
        btn.style.marginTop = '10px';
        btn.style.padding = '10px';
        btn.style.borderRadius = '8px';
        btn.style.cursor = 'pointer';
        // اضافه کردن به انتهای منو
        hamburgerMenu.appendChild(divider);
        hamburgerMenu.appendChild(btn);
    } catch (e) {}
};

// تابع اتصال کیف پول با نوع مشخص
async function connectWalletAndUpdateUI(walletType) {
    try {
        const connectButton = document.getElementById('connectButton');
        const walletConnectButton = document.getElementById('walletConnectButton');
        
        if (walletType === 'metamask' && connectButton) {
            connectButton.textContent = 'در حال اتصال...';
            connectButton.disabled = true;
        } else if (walletType === 'walletconnect' && walletConnectButton) {
            walletConnectButton.textContent = 'در حال اتصال...';
            walletConnectButton.disabled = true;
        }

        let connected = false;
        if (walletType === 'metamask') {
            connected = await window.contractConfig.initializeWeb3();
        } else if (walletType === 'walletconnect') {
            connected = await window.contractConfig.connectWithWalletConnect();
        }

        if (!connected) {
            throw new Error("اتصال کیف پول ناموفق بود");
        }

        // دریافت پروفایل کاربر
        const profile = await loadUserProfileOnce();
        const address = await window.contractConfig.signer.getAddress();

        // به‌روزرسانی UI
        updateConnectionUI(profile, address, walletType);

        // بعد از به‌روزرسانی UI:
        setTimeout(window.addOwnerPanelButtonIfOwner, 500);

    } catch (error) {
        alert("اتصال کیف پول ناموفق بود: " + error.message);
    } finally {
        const connectButton = document.getElementById('connectButton');
        const walletConnectButton = document.getElementById('walletConnectButton');
        
        if (connectButton) {
            connectButton.textContent = 'اتصال با متامسک';
            connectButton.disabled = false;
        }
        
        if (walletConnectButton) {
            walletConnectButton.textContent = 'اتصال با WalletConnect';
            walletConnectButton.disabled = false;
        }
    }
}

// به‌روزرسانی تابع updateConnectionUI برای پشتیبانی از انواع کیف پول
function updateConnectionUI(profile, address, walletType) {
    const connectButton = document.getElementById('connectButton');
    const walletConnectButton = document.getElementById('walletConnectButton');
    
    if (walletType === 'metamask' && connectButton) {
        connectButton.textContent = 'متصل: ' + shortenAddress(address);
        connectButton.style.background = 'linear-gradient(90deg, #4CAF50 0%, #45a049 100%)';
        connectButton.disabled = true;
    } else if (walletType === 'walletconnect' && walletConnectButton) {
        walletConnectButton.textContent = 'متصل: ' + shortenAddress(address);
        walletConnectButton.style.background = 'linear-gradient(90deg, #3b99fc 0%, #2a7de1 100%)';
        walletConnectButton.disabled = true;
    }

    // سایر به‌روزرسانی‌های UI
const updateElement = (id, value) => {
    const element = document.getElementById(id);
    if (!element) return;
    
    // فرمت‌دهی اعداد بزرگ
    if (typeof value === 'string' && value.includes('.')) {
        const num = parseFloat(value);
        if (!isNaN(num)) {
            if (num >= 1000000) {
                value = (num / 1000000).toFixed(2) + 'M';
            } else if (num >= 1000) {
                value = (num / 1000).toFixed(2) + 'K';
            } else {
                value = num.toLocaleString('en-US', {
                maximumFractionDigits: 6
            });
            }
        }
    }
    
    element.textContent = value;
};

    updateElement('user-address', shortenAddress(address));
    updateElement('usdc-balance', profile.usdcBalance + ' USDC');
    updateElement('profile-usdc', profile.usdcBalance + ' USDC');

    const userDashboard = document.getElementById('user-dashboard');
    const mainContent = document.getElementById('main-content');

    if (userDashboard) userDashboard.style.display = 'block';
    if (mainContent) mainContent.style.display = 'none';
    
    // راه‌اندازی تایمر پاداش باینری
    if (profile.lastClaimTime) {
        // بررسی وجود تابع startBinaryClaimCountdown
        if (typeof window.startBinaryClaimCountdown === 'function') {
            window.startBinaryClaimCountdown(profile.lastClaimTime);
        } else {
            // اگر تابع موجود نیست، مستقیماً تایمر را راه‌اندازی کن
            const timerEl = document.getElementById('binary-claim-timer');
            if (timerEl) {
                function updateTimer() {
                    const now = Math.floor(Date.now() / 1000);
                    const nextClaim = Number(profile.lastClaimTime) + 12 * 3600;
                    const diff = nextClaim - now;
                    if (diff <= 0) {
                        timerEl.textContent = '';
                        return;
                    }
                    const hours = Math.floor(diff / 3600);
                    const minutes = Math.floor((diff % 3600) / 60);
                    const seconds = diff % 60;
                    timerEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes
                        .toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    setTimeout(updateTimer, 1000);
                }
                updateTimer();
            }
        }
    }
    
    // به‌روزرسانی ناوبار بر اساس وضعیت کاربر
    updateNavbarBasedOnUserStatus();
    
    // بعد از به‌روزرسانی UI:
    setTimeout(window.addOwnerPanelButtonIfOwner, 500);
}

// تابع fetchUserProfile که در main.js فراخوانی می‌شود
async function fetchUserProfile() {
    try {
        const { contract, address } = await connectWallet();
        // دریافت موجودی‌ها
        const provider = contract.provider;
        const signer = contract.signer || (provider && provider.getSigner ? await provider.getSigner() : null);
        let usdcBalance = '0';
        if (signer && typeof USDC_ADDRESS !== 'undefined' && typeof USDC_ABI !== 'undefined') {
          const usdcContract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, signer);
          const usdcDecimals = await usdcContract.decimals();
          const usdcRaw = await usdcContract.balanceOf(address);
          usdcBalance = ethers.formatUnits(usdcRaw, usdcDecimals);
        }
        // دریافت اطلاعات کاربر
        const userData = await contract.users(address);
        // دریافت قیمت LVL/MATIC و MATIC/USD
        const [tokenPriceMatic, maticPriceUSD] = await Promise.all([
            contract.getTokenPrice(),
            window.fetchPolUsdPrice()
        ]);
        const formattedMaticBalance = ethers.formatEther(maticBalance);
        const formattedLvlBalance = ethers.formatUnits(lvlBalance, 18);
        const tokenPriceMaticFormatted = ethers.formatUnits(tokenPriceMatic, 18);
        // قیمت CPA/USD = (CPA/MATIC) * (MATIC/USD)
        const tokenPriceUSD = parseFloat(tokenPriceMaticFormatted) * parseFloat(maticPriceUSD);
        // محاسبه ارزش دلاری
        const maticValueUSD = parseFloat(formattedMaticBalance) * parseFloat(maticPriceUSD);
        const lvlValueUSD = parseFloat(formattedLvlBalance) * tokenPriceUSD;
        return {
            address,
            usdcBalance,
            isRegistered: userData.activated,
            binaryPoints: ethers.formatUnits(userData.binaryPoints, 18),
            binaryPointCap: userData.binaryPointCap.toString(),
            referrer: userData.referrer
        };
    } catch (error) {
        return {
            address: '---',
            usdcBalance: '0',
            isRegistered: false,
            binaryPoints: '0',
            binaryPointCap: '0',
            referrer: '---'
        };
    }
}

// تابع اتصال به کیف پول
async function connectWallet() {
    try {
        // بررسی اتصال موجود
        if (window.contractConfig && window.contractConfig.contract && window.contractConfig.address) {
            return window.contractConfig;
        }
        
        // بررسی اتصال MetaMask موجود
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts && accounts.length > 0) {
                try {
                    await initializeWeb3();
                    return window.contractConfig;
                } catch (error) {
                    throw new Error('خطا در راه‌اندازی Web3');
                }
            }
        }
        
        throw new Error('لطفاً ابتدا کیف پول خود را متصل کنید');
        
    } catch (error) {
        throw error;
    }
}

// تابع به‌روزرسانی ناوبار بر اساس وضعیت کاربر
async function updateNavbarBasedOnUserStatus() {
    try {
        const connection = await checkConnection();
        if (!connection.connected) {
            // اگر کاربر متصل نیست، ناوبار را به حالت پیش‌فرض برگردان
            resetNavbarToDefault();
            return;
        }

        const { contract, address } = await connectWallet();
        
        try {
            const userData = await contract.users(address);
            
            if (userData.activated) {
                // کاربر فعال - تغییر "ثبت‌نام" به "ارتقا"
                updateNavbarForActiveUser();
            } else {
                // کاربر غیرفعال - ناوبار به حالت پیش‌فرض
                resetNavbarToDefault();
            }
        } catch (userDataError) {
            console.warn('Could not fetch user data:', userDataError);
            resetNavbarToDefault();
        }
    } catch (error) {
        console.warn('Error updating navbar:', error);
        resetNavbarToDefault();
    }
}

// تابع تغییر ناوبار برای کاربران فعال
function updateNavbarForActiveUser() {
    // تغییر در ناوبار دسکتاپ
    const desktopRegisterLink = document.querySelector('.desktop-nav a[href="#main-register"]');
    if (desktopRegisterLink) {
        desktopRegisterLink.innerHTML = '<i class="fa-solid fa-arrow-up icon" aria-hidden="true"></i><span class="label">افزایش سقف</span>';
        desktopRegisterLink.title = 'افزایش سقف';
    }
    
    // تغییر در ناوبار موبایل
    const mobileRegisterLink = document.querySelector('.fab-menu a[href="#main-register"]');
    if (mobileRegisterLink) {
        mobileRegisterLink.innerHTML = '<i class="fa-solid fa-arrow-up icon" aria-hidden="true"></i><span class="label">افزایش سقف</span>';
        mobileRegisterLink.title = 'افزایش سقف';
    }
}

// تابع بازگرداندن ناوبار به حالت پیش‌فرض
function resetNavbarToDefault() {
    // بازگرداندن ناوبار دسکتاپ
    const desktopRegisterLink = document.querySelector('.desktop-nav a[href="#main-register"]');
    if (desktopRegisterLink) {
        desktopRegisterLink.innerHTML = '<i class="fa-solid fa-user-plus icon" aria-hidden="true"></i><span class="label">ثبت‌نام</span>';
        desktopRegisterLink.title = 'ثبت‌نام';
    }
    
    // بازگرداندن ناوبار موبایل
    const mobileRegisterLink = document.querySelector('.fab-menu a[href="#main-register"]');
    if (mobileRegisterLink) {
        mobileRegisterLink.innerHTML = '<i class="fa-solid fa-user-plus icon" aria-hidden="true"></i><span class="label">ثبت‌نام</span>';
        mobileRegisterLink.title = 'ثبت‌نام';
    }
}

// تابع بررسی اتصال کیف پول
async function checkConnection() {
    try {
        const { provider, address } = await connectWallet();
        const network = await provider.getNetwork();
        
        return {
            connected: true,
            address,
            network: network.name,
            chainId: network.chainId
        };
    } catch (error) {
        return {
            connected: false,
            error: error.message
        };
    }
}

// Initialize price chart when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize price chart after a short delay to ensure all modules are loaded
    setTimeout(async () => {
        try {
            if (window.priceChart && window.priceChart.initialize) {
                await window.priceChart.initialize();
            }
        } catch (error) {
        }
    }, 1000);
});

// Cache برای پروفایل کاربر
let userProfileCache = null;
let userProfileCacheTime = 0;
const CACHE_DURATION = 30000; // 30 ثانیه

async function loadUserProfileOnce() {
    const now = Date.now();
    
    // اگر cache معتبر است، از آن استفاده کن
    if (userProfileCache && (now - userProfileCacheTime) < CACHE_DURATION) {
        return userProfileCache;
    }
    
    try {
        // دریافت پروفایل جدید
        if (window.getUserProfile) {
            userProfileCache = await window.getUserProfile();
            userProfileCacheTime = now;
            return userProfileCache;
        } else {
            console.warn('getUserProfile function not available');
            return null;
        }
    } catch (error) {
        console.error('Error loading user profile:', error);
        return null;
    }
}

// تابع پاک کردن cache پروفایل
function clearUserProfileCache() {
    userProfileCache = null;
    userProfileCacheTime = 0;
    console.log('User profile cache cleared');
}

// Export برای استفاده در سایر فایل‌ها
window.clearUserProfileCache = clearUserProfileCache;

// Lock navigation for deactivated users
async function lockTabsForDeactivatedUsers() {
    if (!window.getUserProfile) return;
    const profile = await loadUserProfileOnce();
    if (!profile.activated) {
        const lockTabs = [
            { id: 'tab-shop-btn', label: 'SHOP' },
            { id: 'tab-lottery-btn', label: 'LOTTERY' },
            { id: 'tab-reports-btn', label: 'REPORTS' },
            { id: 'tab-learning-btn', label: 'LEARNING' }
        ];
        lockTabs.forEach(tab => {
            const el = document.getElementById(tab.id);
            if (el) {
                el.innerHTML = '🔒 ' + tab.label;
                el.classList.add('locked-tab');
                if (el.style) {
                  el.style.pointerEvents = 'none';
                  el.style.opacity = '0.5';
                }
                el.title = 'این بخش فقط برای کاربران فعال باز است';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', lockTabsForDeactivatedUsers);

// تایمر شمارش معکوس جلسه آنلاین بعدی (فقط برای کاربران فعال)
const nextSessionDate = new Date("2025-07-01T16:30:00+03:30"); // تاریخ و ساعت جلسه بعدی را اینجا تنظیم کنید
function updateSessionTimer() {
    const now = new Date();
    const diff = nextSessionDate - now;
    if (diff <= 0) {
        document.getElementById('session-timer').textContent = "جلسه آنلاین در حال برگزاری است!";
        return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    document.getElementById('session-timer').textContent =
        `${days} روز و ${hours} ساعت و ${minutes} دقیقه و ${seconds} ثانیه`;
}
if (document.getElementById('session-timer')) {
    setInterval(updateSessionTimer, 1000);
    updateSessionTimer();
}
(async function() {
    if (window.getUserProfile) {
        const profile = await loadUserProfileOnce();
        if (profile && profile.activated) {
            var sessionBox = document.getElementById('session-timer-box');
            if (sessionBox) sessionBox.style.display = 'block';
        }
    }
})();

// نمایش قیمت توکن برای همه کاربران (حتی بدون اتصال کیف پول)
async function showTokenPricesForAll() {
    try {
        // اگر contractConfig و contract آماده است
        if (window.contractConfig && window.contractConfig.contract) {
            const contract = window.contractConfig.contract;
            // قیمت CPA به USDC (قیمت توکن مستقیماً به USDC است)
            const tokenPrice = await contract.getTokenPrice();
            const tokenPriceFormatted = ethers.formatUnits(tokenPrice, 18);
            
            // نمایش در عناصر
            const cpaUsd = document.getElementById('chart-lvl-usd');
            if (cpaUsd) cpaUsd.textContent = '$' + tokenPriceFormatted;
        }
    } catch (e) {
        // اگر خطا بود، مقدار پیش‌فرض نمایش بده
        const cpaUsd = document.getElementById('chart-lvl-usd');
        if (cpaUsd) cpaUsd.textContent = '-';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(showTokenPricesForAll, 1200);
});

// نمایش موجودی و ارزش دلاری فقط با اتصال کیف پول
async function showUserBalanceBox() {
    const box = document.getElementById('user-balance-box');
    if (!box) return;
    try {
        const { contract, address } = await connectWallet();
        if (!contract || !address) throw new Error('No wallet');
        // دریافت موجودی و قیمت
        const [lvlBalance, tokenPrice] = await Promise.all([
            contract.balanceOf(address),
            contract.getTokenPrice()
        ]);
        const lvl = ethers.formatUnits(lvlBalance, 18);
        const tokenPriceFormatted = ethers.formatUnits(tokenPrice, 18);
        const usdValue = (parseFloat(lvl) * parseFloat(tokenPriceFormatted)).toFixed(2);
        document.getElementById('user-lvl-balance').textContent = lvl;
        document.getElementById('user-lvl-usd-value').textContent = usdValue + ' $';
        box.style.display = 'block';
    } catch (e) {
        box.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(showUserBalanceBox, 1500);
});

// تابع نمایش اطلاعات یک گره شبکه در باکس موجودی شما
window.updateUserBalanceBoxWithNode = async function(address, userData) {
    console.log('updateUserBalanceBoxWithNode called with:', address, userData);
    console.log('UserData fields:', Object.keys(userData || {}));
    console.log('All userData values:', userData);
    console.log('binaryPoints:', userData?.binaryPoints);
    console.log('binaryPointCap:', userData?.binaryPointCap);
    console.log('activated:', userData?.activated);
    console.log('leftPoints:', userData?.leftPoints);
    console.log('rightPoints:', userData?.rightPoints);
    console.log('index:', userData?.index);
    console.log('totalPurchasedKind:', userData?.totalPurchasedKind);
    console.log('binaryPointsClaimed:', userData?.binaryPointsClaimed);
    console.log('depositedAmount:', userData?.depositedAmount);
    
    const box = document.getElementById('user-balance-box');
    if (!box) {
        console.log('user-balance-box not found');
        return;
    }
    console.log('Found user-balance-box, setting display to block');
    box.style.display = 'block';
    
    // آدرس کوتاه شده
    const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '-';
    console.log('Short address:', shortAddress);
    
    // دریافت معرف از قرارداد
    let referrerAddress = '-';
    try {
        if (window.contractConfig && window.contractConfig.contract) {
            const contract = window.contractConfig.contract;
            const userIndex = userData?.index;
            if (userIndex && userIndex > 0) {
                referrerAddress = await contract.getReferrer(userIndex);
                referrerAddress = referrerAddress && referrerAddress !== '0x0000000000000000000000000000000000000000' 
                    ? shortenAddress(referrerAddress) : '-';
            }
        }
    } catch (e) {
        console.log('Error getting referrer:', e);
        referrerAddress = '-';
    }
    
    // اطلاعات اصلی
    const lvlBalanceElement = document.getElementById('user-lvl-balance');
    
    if (lvlBalanceElement) {
        // دریافت موجودی واقعی CPA از قرارداد
        let balanceInCPA = '-';
        try {
            if (window.contractConfig && window.contractConfig.contract) {
                const contract = window.contractConfig.contract;
                const balance = await contract.balanceOf(address);
                const balanceStr = balance ? (typeof balance === 'bigint' ? balance.toString() : balance) : null;
                // تبدیل از wei به CPA (18 رقم اعشار)
                balanceInCPA = balanceStr ? (parseInt(balanceStr) / Math.pow(10, 18)).toFixed(2) : null;
            }
        } catch (e) {
            console.log('Error getting CPA balance:', e);
            balanceInCPA = '-';
        }
        lvlBalanceElement.textContent = balanceInCPA ? `${balanceInCPA} CPA` : '-';
        console.log('Updated lvl balance:', lvlBalanceElement.textContent);
    }
    
    // ایجاد یا آپدیت بخش اطلاعات تکمیلی
    let extraInfo = document.getElementById('node-extra-info');
    if (!extraInfo) {
        extraInfo = document.createElement('div');
        extraInfo.id = 'node-extra-info';
        extraInfo.style.cssText = `
            margin-top: 0.5rem;
            padding: 0.75rem;
            background: rgba(255, 255, 255, 0.03);
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(10px);
        `;
        box.appendChild(extraInfo);
        console.log('Created new extra-info div');
    }
    
    // محتوای اطلاعات دسته‌بندی شده - فشرده و بهینه برای موبایل
    extraInfo.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; font-size: 0.8rem;">
            <!-- آدرس و وضعیت در یک ردیف -->
            <div style="grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem; padding-bottom: 0.3rem; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <div style="color: #b8c1ec; font-family: monospace; font-size: 0.75rem;">${shortAddress}</div>
                <div style="color: ${userData?.[4] ? '#4ade80' : '#f87171'}; font-size: 0.7rem; padding: 0.1rem 0.4rem; background: ${userData?.[4] ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)'}; border-radius: 3px;">
                    ${userData?.[4] ? 'فعال' : 'غیرفعال'}
                </div>
            </div>
            
            <!-- معرف -->
            <div style="display: flex; flex-direction: column; gap: 0.1rem;">
                <div style="color: #a786ff; font-size: 0.7rem; opacity: 0.8;">👤 معرف</div>
                <div style="color: #b8c1ec; font-size: 0.7rem; font-family: monospace;">
                    ${referrerAddress}
                </div>
            </div>
            
            <!-- سقف درآمد -->
            <div style="display: flex; flex-direction: column; gap: 0.1rem;">
                <div style="color: #a786ff; font-size: 0.7rem; opacity: 0.8;">💰 سقف</div>
                <div style="color: #b8c1ec; font-size: 0.7rem;">${userData?.[2] ? (typeof userData[2] === 'bigint' ? userData[2].toString() : userData[2]) : '-'} پوینت</div>
            </div>
            
            <!-- امتیاز چپ -->
            <div style="display: flex; flex-direction: column; gap: 0.1rem;">
                <div style="color: #a786ff; font-size: 0.7rem; opacity: 0.8;">⬅️ چپ</div>
                <div style="color: #b8c1ec; font-size: 0.7rem;">${userData?.[8] ? (typeof userData[8] === 'bigint' ? userData[8].toString() : userData[8]) : '-'}</div>
            </div>
            
            <!-- امتیاز راست -->
            <div style="display: flex; flex-direction: column; gap: 0.1rem;">
                <div style="color: #a786ff; font-size: 0.7rem; opacity: 0.8;">➡️ راست</div>
                <div style="color: #b8c1ec; font-size: 0.7rem;">${userData?.[7] ? (typeof userData[7] === 'bigint' ? userData[7].toString() : userData[7]) : '-'}</div>
            </div>
            
            <!-- لینک رفرال -->
            <div style="grid-column: 1 / -1; display: flex; align-items: center; gap: 0.3rem; margin-top: 0.2rem; padding-top: 0.2rem; border-top: 1px solid rgba(255,255,255,0.1);">
                <div style="color: #a786ff; font-size: 0.7rem; opacity: 0.8;">🔗 دعوت:</div>
                <div style="color: #b8c1ec; font-size: 0.65rem; font-family: monospace; flex: 1;">${shortWallet(address)}</div>
                <button onclick="copyReferralLink('${address}')" style="background: #a786ff; color: white; border: none; border-radius: 3px; padding: 0.2rem 0.4rem; font-size: 0.6rem; cursor: pointer;">کپی</button>
            </div>
        </div>
    `;
    console.log('Updated extra info content');
};

// تابع کوتاه کردن آدرس
function shortWallet(address) {
    if (!address) return '-';
    return `${address.slice(0, 3)}...${address.slice(-3)}`;
}

// تابع کپی کردن لینک رفرال
window.copyReferralLink = function(address) {
    const referralLink = `${window.location.origin}${window.location.pathname}?ref=${address}`;
    navigator.clipboard.writeText(referralLink).then(() => {
        // نمایش پیام موفقیت
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'کپی شد!';
        button.style.background = '#4ade80';
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#a786ff';
        }, 2000);
    }).catch(err => {
        console.error('خطا در کپی کردن لینک:', err);
        // روش جایگزین برای مرورگرهای قدیمی
        const textArea = document.createElement('textarea');
        textArea.value = referralLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'کپی شد!';
        button.style.background = '#4ade80';
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#a786ff';
        }, 2000);
    });
};

window.networkRendered = false;

// تابع کوتاه کردن آدرس
function shortWallet(address) {
    if (!address) return '-';
    return `${address.slice(0, 3)}...${address.slice(-3)}`;
}

// تابع کپی کردن لینک رفرال
window.copyReferralLink = function(address) {
    const referralLink = `${window.location.origin}${window.location.pathname}?ref=${address}`;
    navigator.clipboard.writeText(referralLink).then(() => {
        // نمایش پیام موفقیت
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'کپی شد!';
        button.style.background = '#4ade80';
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#a786ff';
        }, 2000);
    }).catch(err => {
        console.error('خطا در کپی کردن لینک:', err);
        // روش جایگزین برای مرورگرهای قدیمی
        const textArea = document.createElement('textarea');
        textArea.value = referralLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'کپی شد!';
        button.style.background = '#4ade80';
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#a786ff';
        }, 2000);
    });
};

window.showTab = async function(tab) {
      const tabs = ['network','profile','reports','swap','transfer','news','shop','learning','about','register'];
      tabs.forEach(function(name) {
        var mainEl = document.getElementById('main-' + name);
        if (mainEl) {
          if (name === tab) {
            mainEl.style.display = '';
            // اضافه کردن انیمیشن fade-in
            mainEl.style.opacity = '0';
            mainEl.style.transform = 'translateY(20px)';
            setTimeout(() => {
              mainEl.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              mainEl.style.opacity = '1';
              mainEl.style.transform = 'translateY(0)';
            }, 50);
          } else {
            mainEl.style.display = 'none';
            mainEl.style.opacity = '1';
            mainEl.style.transform = 'translateY(0)';
          }
        }
        var btnEl = document.getElementById('tab-' + name + '-btn');
        if (btnEl) btnEl.classList.toggle('active', name === tab);
      });
      // اسکرول به بخش انتخاب شده
      const targetElement = document.getElementById('main-' + tab);
      if (targetElement) {
        // بستن منوی همبرگر
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        if (hamburgerMenu) {
          hamburgerMenu.classList.remove('open');
        }
        // اسکرول نرم به بخش
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            targetElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start',
              inline: 'nearest'
            });
          }, 200);
        }, 100);
      }
      try {
        switch(tab) {
          case 'network':
            if (typeof window.initializeNetworkTab === 'function') {
              await window.initializeNetworkTab();
            } else {
              if (typeof updateNetworkStats === 'function') await updateNetworkStats();
            }
            break;
          case 'profile':
            if (typeof window.loadUserProfile === 'function') await window.loadUserProfile();
            break;
          case 'reports':
            if (typeof window.loadReports === 'function') await window.loadReports();
            break;
          case 'swap':
            if (typeof window.loadSwapTab === 'function') await window.loadSwapTab();
            break;
          case 'transfer':
            if (typeof window.loadTransferTab === 'function') await window.loadTransferTab();
            break;
          case 'register':
            if (typeof window.setRegisterTabSelected === 'function') window.setRegisterTabSelected(true);
            if (typeof window.loadRegisterData === 'function' && window.contractConfig) {
              await window.loadRegisterData(window.contractConfig.contract, window.contractConfig.address, window.tokenPriceUSDFormatted);
            }
            break;
        }
      } catch (e) { console.error(e); }
    }

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('empty-node')) {
    (async function() {
      const { contract, address, provider } = await window.connectWallet();
      const userData = await contract.users(address);
      let referrerAddress;
      let defaultNewWallet = '';
      if (userData.activated) {
        // حالت ۱: کاربر ثبت‌نام کرده و می‌خواهد زیرمجموعه بگیرد
        const childIndex = e.target.getAttribute('data-index');
        const parentIndex = Math.floor(Number(childIndex) / 2);
        referrerAddress = await contract.indexToAddress(BigInt(parentIndex));
        defaultNewWallet = '';
      } else {
        // حالت ۲ و ۳: کاربر ثبت‌نام نکرده
        referrerAddress = getReferrerFromURL() || getReferrerFromStorage();
        if (!referrerAddress) {
          referrerAddress = await contract.deployer();
        }
        defaultNewWallet = address;
      }
      showRegisterForm(referrerAddress, defaultNewWallet, address, provider, contract);
    })();
  }
});

// فرم ثبت‌نام با ورودی آدرس ولت جدید و نمایش موجودی متیک و توکن - بهینه‌سازی شده برای موبایل
function showRegisterForm(referrerAddress, defaultNewWallet, connectedAddress, provider, contract) {
  let old = document.getElementById('register-form-modal');
  if (old) old.remove();
  
  const modal = document.createElement('div');
  modal.id = 'register-form-modal';
  modal.style = `
    position: fixed;
    z-index: 3000;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    box-sizing: border-box;
  `;
  
  modal.innerHTML = `
    <div style="
      background: linear-gradient(135deg, #181c2a, #232946);
      padding: 1.5rem;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
      width: 100%;
      max-width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      direction: rtl;
      position: relative;
      border: 2px solid #a786ff;
    ">
      <!-- Header -->
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid #a786ff;
      ">
        <h3 style="
          color: #00ff88;
          margin: 0;
          font-size: 1.3rem;
          font-weight: bold;
          text-align: center;
          flex: 1;
        ">📝 ثبت‌نام جدید</h3>
        <button id="register-form-close" style="
          background: none;
          border: none;
          color: #fff;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        " onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='none'">×</button>
      </div>

      <!-- Referrer Info -->
      <div style="
        background: rgba(167, 134, 255, 0.1);
        border: 1px solid #a786ff;
        border-radius: 12px;
        padding: 1rem;
        margin-bottom: 1.5rem;
      ">
        <div style="color: #a786ff; font-weight: bold; margin-bottom: 0.5rem;">👤 معرف (Referrer):</div>
        <div style="
          color: #fff;
          font-family: monospace;
          font-size: 0.9rem;
          word-break: break-all;
          background: rgba(0,0,0,0.3);
          padding: 0.5rem;
          border-radius: 6px;
        ">${referrerAddress}</div>
      </div>

      <!-- New Wallet Input -->
      <div style="margin-bottom: 1.5rem;">
        <label for="register-new-wallet" style="
          display: block;
          color: #fff;
          font-weight: bold;
          margin-bottom: 0.5rem;
        ">🔑 آدرس ولت جدید:</label>
        <input id="register-new-wallet" 
          type="text" 
          placeholder="0x..." 
          value="${defaultNewWallet}"
          style="
            width: 100%;
            padding: 1rem;
            border-radius: 12px;
            border: 2px solid #a786ff;
            background: rgba(0,0,0,0.3);
            color: #fff;
            font-family: monospace;
            font-size: 1rem;
            direction: ltr;
            text-align: left;
            box-sizing: border-box;
            transition: border-color 0.3s;
          "
          onfocus="this.style.borderColor='#00ff88'"
          onblur="this.style.borderColor='#a786ff'"
        />
      </div>

      <!-- Balance Info -->
      <div style="
        background: rgba(0, 255, 136, 0.1);
        border: 1px solid #00ff88;
        border-radius: 12px;
        padding: 1rem;
        margin-bottom: 1.5rem;
      ">
        <div style="color: #00ff88; font-weight: bold; margin-bottom: 1rem;">💰 موجودی‌های شما:</div>
        
        <div style="display: grid; gap: 0.8rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #fff;">🟣 POL:</span>
            <span id="register-matic-balance" style="color: #a786ff; font-weight: bold;">در حال دریافت...</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #fff;">🟢 CPA:</span>
            <span id="register-cpa-balance" style="color: #00ff88; font-weight: bold;">در حال دریافت...</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #fff;">💵 USDC:</span>
            <span id="register-usdc-balance" style="color: #00ccff; font-weight: bold;">در حال دریافت...</span>
          </div>
        </div>
      </div>

      <!-- Required Amount -->
      <div style="
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid #ff6b6b;
        border-radius: 12px;
        padding: 1rem;
        margin-bottom: 1.5rem;
      ">
        <div style="color: #ff6b6b; font-weight: bold; margin-bottom: 0.5rem;">⚠️ مقدار مورد نیاز:</div>
        <div id="register-required-usdc" style="
          color: #ff6b6b;
          font-size: 1.1rem;
          font-weight: bold;
          text-align: center;
        ">در حال دریافت...</div>
      </div>

      <!-- Action Buttons -->
      <div style="
        display: flex;
        gap: 1rem;
        flex-direction: column;
      ">
        <button id="register-form-confirm" style="
          background: linear-gradient(135deg, #00ff88, #00cc66);
          color: #232946;
          font-weight: bold;
          padding: 1rem;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);
        " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(0,255,136,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(0,255,136,0.3)'">
          ✅ ثبت‌نام
        </button>
        <button id="register-form-cancel" style="
          background: linear-gradient(135deg, #a786ff, #8b6bff);
          color: #fff;
          font-weight: bold;
          padding: 1rem;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(167, 134, 255, 0.3);
        " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(167,134,255,0.4)'" onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(167,134,255,0.3)'">
          ❌ انصراف
        </button>
      </div>

      <!-- Status Message -->
      <div id="register-form-status" style="
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 8px;
        text-align: center;
        font-weight: bold;
        min-height: 20px;
      "></div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Close button functionality
  document.getElementById('register-form-close').onclick = () => modal.remove();
  document.getElementById('register-form-cancel').onclick = () => modal.remove();
  
  // Close on background click
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };
  // دریافت و نمایش موجودی متیک و توکن
  (async function() {
    try {
      let matic = '-';
      let cpa = '-';
      let usdc = '-';
      let requiredUsdc = '-';
      if (provider && connectedAddress) {
        const bal = await provider.getBalance(connectedAddress);
        matic = window.ethers ? window.ethers.formatUnits(bal, 18) : bal.toString();
      }
      if (contract && connectedAddress) {
        const cpaBal = await contract.balanceOf(connectedAddress);
        cpa = window.ethers ? window.ethers.formatUnits(cpaBal, 18) : cpaBal.toString();
        
        // دریافت موجودی USDC
        const USDC_ADDRESS = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
        const USDC_ABI = ["function balanceOf(address) view returns (uint256)"];
        const usdcContract = new ethers.Contract(USDC_ADDRESS, USDC_ABI, contract.signer);
        const usdcBal = await usdcContract.balanceOf(connectedAddress);
        usdc = window.ethers ? window.ethers.formatUnits(usdcBal, 6) : usdcBal.toString();
        
        // دریافت مقدار مورد نیاز برای ثبت‌نام
        try {
          const regprice = await contract.regprice();
          requiredUsdc = window.ethers ? window.ethers.formatUnits(regprice, 18) : regprice.toString();
        } catch (e) {
          requiredUsdc = '0.01'; // مقدار پیش‌فرض
        }
      }
      document.getElementById('register-matic-balance').textContent = matic;
      document.getElementById('register-cpa-balance').textContent = cpa;
      document.getElementById('register-usdc-balance').textContent = usdc;
      document.getElementById('register-required-usdc').textContent = requiredUsdc + ' USDC';
    } catch (e) {
      document.getElementById('register-matic-balance').textContent = '-';
      document.getElementById('register-cpa-balance').textContent = '-';
      document.getElementById('register-usdc-balance').textContent = '-';
      document.getElementById('register-required-usdc').textContent = '-';
    }
  })();
  document.getElementById('register-form-confirm').onclick = async function() {
    const statusDiv = document.getElementById('register-form-status');
    let newWallet = document.getElementById('register-new-wallet').value.trim();
    if (!/^0x[a-fA-F0-9]{40}$/.test(newWallet)) {
      statusDiv.textContent = 'آدرس ولت جدید معتبر نیست!';
      return;
    }
    try {
      const { contract } = await window.connectWallet();
      await contract.registerAndActivate(referrerAddress, newWallet);
      statusDiv.textContent = 'ثبت‌نام با موفقیت انجام شد!';
      setTimeout(() => { modal.remove(); location.reload(); }, 1200);
    } catch (e) {
      statusDiv.textContent = 'خطا در ثبت‌نام: ' + (e && e.message ? e.message : e);
    }
  };
}

function showUserPopup(address, user) {
    // تابع کوتاه‌کننده آدرس
    function shortAddress(addr) {
        if (!addr) return '-';
        return addr.slice(0, 6) + '...' + addr.slice(-4);
    }
    // اطلاعات struct را به صورت رشته آماده کن
    const infoLines = [
        `Address:   ${shortAddress(address)}`,
        `Index:     ${user.index}`,
        `Activated: ${user.activated ? 'Yes' : 'No'}`,
        `BinaryPoints: ${user.binaryPoints}`,
        `Cap:      ${user.binaryPointCap}`,
        `Left:     ${user.leftPoints}`,
        `Right:    ${user.rightPoints}`,
        `Refclimed:${user.refclimed}`
    ];
    let html = `
      <div style="direction:ltr;font-family:monospace;background:#181c2a;color:#00ff88;padding:1.5rem 2.5rem;border-radius:16px;box-shadow:0 2px 12px #00ff8840;min-width:320px;max-width:95vw;position:relative;">
        <pre id="user-popup-terminal" style="background:#232946;border:1.5px solid #333;padding:1.2rem 1.5rem;border-radius:12px;color:#00ff88;font-size:1.05rem;line-height:2;font-family:monospace;overflow-x:auto;margin-bottom:1.2rem;box-shadow:0 2px 12px #00ff8840;min-width:280px;" title="${address}"></pre>
        <button id="close-user-popup" style="position:absolute;top:10px;right:10px;font-size:1.3rem;background:none;border:none;color:#fff;cursor:pointer;">×</button>
      </div>
    `;
    let popup = document.createElement('div');
    popup.id = 'user-popup';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%,-50%)';
    popup.style.zIndex = 9999;
    popup.innerHTML = html;
    document.body.appendChild(popup);
    document.getElementById('close-user-popup').onclick = () => popup.remove();

  
    const terminalEl = document.getElementById('user-popup-terminal');
    if (terminalEl) {
        terminalEl.textContent = infoLines.join('\n');
    }
}
