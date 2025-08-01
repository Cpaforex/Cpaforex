// WalletConnect Handler - مدیریت جداگانه WalletConnect
let walletConnectProvider = null;
let walletConnectConnector = null;
let isWalletConnectConnecting = false;
let isWalletConnectInitialized = false;

// تنظیمات WalletConnect
const WALLET_CONNECT_CONFIG = {
    bridge: "https://bridge.walletconnect.org",
    clientMeta: {
        name: "LevelUp Platform",
        description: "پلتفرم LevelUp برای آموزش و سرمایه‌گذاری",
        url: window.location.origin,
        icons: ["https://levelup.com/icon.png"]
    }
};

// تابع راه‌اندازی WalletConnect
async function initializeWalletConnect() {
    try {
        // بررسی وجود WalletConnectProvider
        const WalletConnectProvider = window.WalletConnectProvider || window.WalletConnectProvider?.default;
        if (typeof WalletConnectProvider === 'undefined') {
            throw new Error('WalletConnectProvider not available');
        }
        
        // تنظیمات WalletConnect
        const walletConnectOptions = {
            rpc: {
                137: 'https://polygon-rpc.com', // Polygon Mainnet
                80001: 'https://rpc-mumbai.maticvigil.com' // Mumbai Testnet
            },
            qrcode: true,
            pollingInterval: 12000,
            chainId: 137 // Polygon Mainnet
        };
        
        // ایجاد WalletConnect Provider
        walletConnectProvider = new WalletConnectProvider(walletConnectOptions);
        
        // تنظیم event listeners
        setupWalletConnectEvents();
        
        isWalletConnectInitialized = true;
        
        return walletConnectProvider;
    } catch (error) {
        throw error;
    }
}

// تنظیم event listeners برای WalletConnect
function setupWalletConnectEvents() {
    if (!walletConnectProvider) {
        return;
    }
    
    try {
        // Event: اتصال موفق
        walletConnectProvider.on('connect', (error, payload) => {
            if (error) {
                return;
            }
            
            handleWalletConnectSuccess();
        });
        
        // Event: قطع اتصال
        walletConnectProvider.on('disconnect', (error, payload) => {
            if (error) {
                return;
            }
            
            handleWalletConnectDisconnect();
        });
        
        // Event: تغییر حساب
        walletConnectProvider.on('accountsChanged', (accounts) => {
            handleWalletConnectAccountsChanged(accounts);
        });
        
        // Event: تغییر شبکه
        walletConnectProvider.on('chainChanged', (chainId) => {
            handleWalletConnectChainChanged(chainId);
        });
        
        // Event: نمایش URI
        walletConnectProvider.on('display_uri', (error, payload) => {
            if (error) {
                return;
            }
            
            displayWalletConnectQR(payload.params[0]);
        });
        
    } catch (error) {
    }
}

// تابع اتصال با WalletConnect
async function connectWithWalletConnect() {
    try {
        // راه‌اندازی WalletConnect اگر هنوز انجام نشده
        if (!isWalletConnectInitialized) {
            await initializeWalletConnect();
        }
        
        // بررسی وضعیت اتصال فعلی
        if (walletConnectProvider && walletConnectProvider.connected) {
            return walletConnectProvider;
        }
        
        // تنظیم event listener برای display_uri قبل از اتصال
        walletConnectProvider.on('display_uri', (error, payload) => {
            if (error) {
                return;
            }
            
            displayWalletConnectQR(payload.params[0]);
        });
        
        // درخواست اتصال
        await walletConnectProvider.enable();
        
        return walletConnectProvider;
        
    } catch (error) {
        throw error;
    }
}

// تابع نمایش QR code
function displayWalletConnectQR(uri) {
    try {
        // حذف modal قبلی اگر وجود دارد
        const existingModal = document.getElementById('walletconnect-modal');
        if (existingModal) {
            document.body.removeChild(existingModal);
        }
        
        // ایجاد modal برای نمایش QR code
        const modal = document.createElement('div');
        modal.id = 'walletconnect-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid #00ff88;
            border-radius: 20px;
            padding: 2rem;
            text-align: center;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
        `;
        
        // عنوان
        const title = document.createElement('h3');
        title.textContent = 'اتصال با کیف پول';
        title.style.cssText = `
            color: #00ff88;
            margin-bottom: 1rem;
            font-size: 1.5rem;
            font-family: 'Nazanin', 'B Nazanin', 'BNazanin', Tahoma, Arial, sans-serif;
        `;
        
        // توضیحات
        const description = document.createElement('p');
        description.textContent = 'لطفاً این کد QR را با کیف پول خود اسکن کنید';
        description.style.cssText = `
            color: #ffffff;
            margin-bottom: 1rem;
            font-size: 1rem;
            font-family: 'Nazanin', 'B Nazanin', 'BNazanin', Tahoma, Arial, sans-serif;
        `;
        
        // QR code container
        const qrContainer = document.createElement('div');
        qrContainer.id = 'walletconnect-qr';
        qrContainer.style.cssText = `
            margin: 1rem 0;
            display: flex;
            justify-content: center;
            background: white;
            padding: 1rem;
            border-radius: 10px;
            width: 200px;
            height: 200px;
            margin: 1rem auto;
        `;
        
        // دکمه بستن
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'بستن';
        closeBtn.style.cssText = `
            background: #ff4444;
            color: white;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 1rem;
            font-size: 1rem;
            font-family: 'Nazanin', 'B Nazanin', 'BNazanin', Tahoma, Arial, sans-serif;
        `;
        closeBtn.onclick = () => {
            document.body.removeChild(modal);
        };
        
        // اضافه کردن عناصر به modal
        modalContent.appendChild(title);
        modalContent.appendChild(description);
        modalContent.appendChild(qrContainer);
        modalContent.appendChild(closeBtn);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // ایجاد QR code
        if (typeof QRCode !== 'undefined') {
            try {
                new QRCode(qrContainer, {
                    text: uri,
                    width: 180,
                    height: 180,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                });
            } catch (qrError) {
                qrContainer.innerHTML = `
                    <div style="
                        color: #ff4444;
                        padding: 1rem;
                        font-family: monospace;
                        word-break: break-all;
                        font-size: 0.8rem;
                    ">
                        <p>خطا در ایجاد QR Code</p>
                        <p>لطفاً این لینک را کپی کنید:</p>
                        <p>${uri}</p>
                    </div>
                `;
            }
        } else {
            // fallback اگر QRCode library موجود نباشد
            qrContainer.innerHTML = `
                <div style="
                    color: #00ff88;
                    padding: 1rem;
                    font-family: monospace;
                    word-break: break-all;
                    font-size: 0.8rem;
                ">
                    <p>QR Code library not available</p>
                    <p>Please scan this URI manually:</p>
                    <p>${uri}</p>
                </div>
            `;
        }
        
    } catch (error) {
    }
}

// Handler: اتصال موفق WalletConnect
function handleWalletConnectSuccess() {
    try {
        // بستن modal QR code
        const modal = document.getElementById('walletconnect-modal');
        if (modal) {
            document.body.removeChild(modal);
        }
        
        // به‌روزرسانی UI
        // updateConnectionStatus('connected', 'WalletConnect');
        
        // راه‌اندازی مجدد Web3
        if (typeof initializeWeb3 === 'function') {
            initializeWeb3();
        }
        
    } catch (error) {
    }
}

// Handler: قطع اتصال WalletConnect
function handleWalletConnectDisconnect() {
    try {
        // بستن modal QR code
        const modal = document.getElementById('walletconnect-modal');
        if (modal) {
            document.body.removeChild(modal);
        }
        
        // به‌روزرسانی UI
        updateConnectionStatus('disconnected', 'WalletConnect');
        
        // پاکسازی متغیرها
        walletConnectProvider = null;
        isWalletConnectInitialized = false;
        
    } catch (error) {
    }
}

// Handler: تغییر حساب‌های WalletConnect
function handleWalletConnectAccountsChanged(accounts) {
    try {
        if (accounts && accounts.length > 0) {
            // حساب جدید انتخاب شده
            updateConnectionStatus('connected', 'WalletConnect');
            
            // راه‌اندازی مجدد Web3
            if (typeof initializeWeb3 === 'function') {
                initializeWeb3();
            }
            
            // بررسی وضعیت کاربر جدید و نمایش فرم ثبت‌نام اگر فعال نیست
            setTimeout(async () => {
                try {
                    if (window.contractConfig && window.contractConfig.contract) {
                        const { contract } = window.contractConfig;
                        const userData = await contract.users(accounts[0]);
                        if (!userData.activated) {
                            // کاربر فعال نیست - فرم ثبت‌نام را نمایش بده
                            if (typeof window.showRegistrationFormForInactiveUser === 'function') {
                                window.showRegistrationFormForInactiveUser();
                            }
                        }
                    }
                } catch (error) {
                    console.log('Could not check user status after WalletConnect account change:', error);
                }
            }, 2000); // 2 ثانیه صبر کن
        } else {
            // هیچ حسابی متصل نیست
            handleWalletConnectDisconnect();
        }
        
    } catch (error) {
        console.log('Error handling WalletConnect accounts changed:', error);
    }
}

// Handler: تغییر شبکه WalletConnect
function handleWalletConnectChainChanged(chainId) {
    try {
        // بررسی شبکه صحیح
        const targetChainId = '0x89'; // Polygon Mainnet
        
        if (chainId !== targetChainId) {
            updateConnectionStatus('wrong-network', 'WalletConnect');
        } else {
            updateConnectionStatus('connected', 'WalletConnect');
        }
        
    } catch (error) {
    }
}

// تابع قطع اتصال WalletConnect
async function disconnectWalletConnect() {
    try {
        if (walletConnectProvider && walletConnectProvider.connected) {
            await walletConnectProvider.disconnect();
        }
        
        // به‌روزرسانی UI
        updateConnectionStatus('disconnected', 'WalletConnect');
        
    } catch (error) {
        throw error;
    }
}

// تابع بررسی وضعیت اتصال WalletConnect
function isWalletConnectConnected() {
    return walletConnectConnector && walletConnectConnector.connected;
}

// تابع دریافت آدرس فعلی WalletConnect
async function getWalletConnectAddress() {
    if (walletConnectConnector && walletConnectConnector.connected) {
        const accounts = await walletConnectProvider.request({ method: 'eth_accounts' });
        return accounts[0];
    }
    return null;
}

// تابع بررسی شبکه WalletConnect
async function getWalletConnectChainId() {
    if (walletConnectConnector && walletConnectConnector.connected) {
        const chainId = await walletConnectProvider.request({ method: 'eth_chainId' });
        return parseInt(chainId, 16);
    }
    return null;
}

// تابع تغییر شبکه WalletConnect
async function switchWalletConnectNetwork(chainId) {
    try {
        if (!walletConnectConnector || !walletConnectConnector.connected) {
            throw new Error('WalletConnect not connected');
        }
        
        await walletConnectProvider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chainId.toString(16)}` }]
        });
        
        return true;
        
    } catch (error) {
        return false;
    }
}

// تابع ارسال تراکنش با WalletConnect
async function sendWalletConnectTransaction(transaction) {
    try {
        if (!walletConnectConnector || !walletConnectConnector.connected) {
            throw new Error('WalletConnect not connected');
        }
        
        const txHash = await walletConnectProvider.request({
            method: 'eth_sendTransaction',
            params: [transaction]
        });
        
        return txHash;
        
    } catch (error) {
        throw error;
    }
}

// تابع امضای پیام با WalletConnect
async function signWalletConnectMessage(message, address) {
    try {
        if (!walletConnectConnector || !walletConnectConnector.connected) {
            throw new Error('WalletConnect not connected');
        }
        
        const signature = await walletConnectProvider.request({
            method: 'personal_sign',
            params: [message, address]
        });
        
        return signature;
        
    } catch (error) {
        throw error;
    }
}

// تابع به‌روزرسانی وضعیت اتصال
function updateConnectionStatus(status, walletType) {
    try {
        const statusElement = document.getElementById('connection-status');
        if (!statusElement) {
            return;
        }
        
        // حذف کلاس‌های قبلی
        statusElement.className = 'connection-status';
        
        switch (status) {
            case 'connected':
                statusElement.classList.add('connected');
                statusElement.textContent = `متصل (${walletType})`;
                statusElement.style.color = '#00ff88';
                break;
                
            case 'disconnected':
                statusElement.classList.add('disconnected');
                statusElement.textContent = 'قطع اتصال';
                statusElement.style.color = '#ff4444';
                break;
                
            case 'connecting':
                statusElement.classList.add('connecting');
                statusElement.textContent = 'در حال اتصال...';
                statusElement.style.color = '#ffaa00';
                break;
                
            case 'warning':
                statusElement.classList.add('warning');
                statusElement.textContent = walletType;
                statusElement.style.color = '#ffaa00';
                break;
                
            default:
                statusElement.textContent = 'نامشخص';
                statusElement.style.color = '#888888';
        }
        
    } catch (error) {
    }
}

// تابع به‌روزرسانی نمایش دکمه‌های کیف پول
function updateWalletButtonVisibility() {
    const qrBtn = document.getElementById('qr-connect-btn');
    const smartBtn = document.getElementById('smart-connect-btn');
    const disconnectBtn = document.getElementById('disconnect-btn');
    
    if (window.contractConfig && window.contractConfig.address) {
        // کیف پول متصل است
        if (qrBtn) qrBtn.style.display = 'none';
        if (smartBtn) smartBtn.style.display = 'none';
        if (disconnectBtn) disconnectBtn.style.display = 'inline-block';
    } else {
        // کیف پول متصل نیست
        if (qrBtn) qrBtn.style.display = 'inline-block';
        if (smartBtn) smartBtn.style.display = 'inline-block';
        if (disconnectBtn) disconnectBtn.style.display = 'none';
    }
}

// تابع اتصال هوشمند (MetaMask اولویت، WalletConnect پشتیبان)
async function smartConnect() {
    try {
        // اولویت با MetaMask
        if (typeof window.ethereum !== 'undefined') {
            try {
                // درخواست اتصال MetaMask
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
                
                if (accounts && accounts.length > 0) {
                    updateConnectionStatus('connected', 'MetaMask');
                    return 'metamask';
                }
                
            } catch (error) {
                // خطا را نادیده بگیر
            }
        }
        
        // پشتیبان: WalletConnect
        try {
            const provider = await connectWithWalletConnect();
            if (provider && provider.connected) {
                updateConnectionStatus('connected', 'WalletConnect');
                return 'walletconnect';
            }
            
        } catch (error) {
        }
        
        // هیچ کیف پولی متصل نشد
        updateConnectionStatus('disconnected', 'None');
        return null;
        
    } catch (error) {
        updateConnectionStatus('error', 'Connection Failed');
        throw error;
    }
}

// تابع debug برای WalletConnect
function debugWalletConnect() {
    // حذف تمام console.log و console.debug
}

// Export functions for global use
window.WalletConnectHandler = {
    initializeWalletConnect,
    connectWithWalletConnect,
    disconnectWalletConnect,
    isWalletConnectConnected,
    getWalletConnectAddress,
    getWalletConnectChainId,
    switchWalletConnectNetwork,
    sendWalletConnectTransaction,
    signWalletConnectMessage,
    displayWalletConnectQR,
    updateConnectionStatus,
    updateWalletButtonVisibility,
    smartConnect,
    debugWalletConnect
};

