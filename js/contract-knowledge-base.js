/**
 * CPA Smart Contract Knowledge Base
 * این فایل شامل تمام اطلاعات قرارداد CPA برای استفاده دستیار هوشمند در زمان آفلاین است
 */

window.CPA_KNOWLEDGE_BASE = {
    // اطلاعات کلی قرارداد
    contractInfo: {
        name: "CONTINUOUS PROFIT ACADEMY (CPA)",
        tokenSymbol: "CPA",
        standard: "ERC-20",
        blockchain: "Polygon Network",
        contractAddress: "0x045401e0692a84ecDd9c0c0fce3b2E23D864F076",
        daiAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        description: "سیستم خرید/فروش توکن، ساختار درختی بازاریابی، سیستم پاداش باینری، cashback ماهانه",
        title: "مشخصات قرارداد و توکن"
    },

    // سیستم ثبت‌نام و ساختار درختی
    registration: {
        cost: {
            description: "هزینه ثبت‌نام متغیر است",
            details: [
                "اگر تعداد کاربران زیر 1000 باشد: 100 CPA یا 150 CPA (بستگی به موجودی قرارداد)",
                "اگر بیشتر از 1000 کاربر باشد: 200 CPA"
            ]
        },
        requirements: [
            "کاربر باید توسط یک معرف ثبت‌نام شود",
            "معرف باید قبلاً ثبت‌نام کرده باشد",
            "کاربر نباید قبلاً ثبت‌نام کرده باشد"
        ],
        treeStructure: {
            type: "درخت باینری کامل",
            positioning: "کاربران جدید در کم‌ترین شاخه آزاد قرار می‌گیرند",
            referral: "هر کاربر می‌تواند حداکثر 2 زیرمجموعه مستقیم داشته باشد (چپ و راست)"
        },
        title: "ثبت‌نام و ساختار شبکه"
    },

    // سیستم خرید و فروش توکن
    trading: {
        buyTokens: {
            minimum: "1 DAI",
            fees: [
                "0.5% برای توسعه‌دهنده",
                "0.5% برای معرف", 
                "1% برای ذخیره پشتیبان",
                "98% برای خریدار"
            ],
            limit: "حداکثر 1% از موجودی DAI قرارداد (اگر موجودی بیش از 100,000 DAI باشد)"
        },
        sellTokens: {
            minimum: "1 توکن CPA",
            fees: [
                "0.5% برای توسعه‌دهنده",
                "0.5% برای معرف",
                "1% برای ذخیره پشتیبان", 
                "98% برای فروشنده"
            ],
            limit: "حداکثر 1% از عرضه کل توکن (اگر موجودی DAI بیش از 500 باشد)"
        },
        priceFormula: {
            description: "قیمت بر اساس نسبت موجودی DAI به عرضه کل توکن‌ها",
            formula: "(موجودی DAI قرارداد * 1e18) / عرضه کل توکن‌ها",
            minimumPrice: "0.001 DAI به ازای هر توکن"
        },
        title: "خرید و فروش توکن"
    },

    // سیستم پاداش باینری
    binaryRewards: {
        points: {
            initialCap: "5 امتیاز",
            maximumCap: "100 امتیاز",
            increaseMethod: "با خریدهای مکرر (هر 1/3 هزینه ثبت‌نام)"
        },
        claiming: {
            cooldown: "12 ساعت بین ادعاها",
            calculation: "(امتیازهای کاربر * ارزش هر امتیاز)",
            pointValue: "(موجودی توکن قرارداد / کل امتیازهای قابل ادعا)"
        },
        title: "پاداش باینری و امتیازها"
    },

    // ویژگی‌های خاص
    specialFeatures: {
        monthlyCashback: {
            conditions: [
                "کاربر نباید زیرمجموعه مستقیم داشته باشد",
                "حداکثر 50% هزینه ثبت‌نام قابل بازگشت است"
            ],
            amount: "3% هزینه ثبت‌نام در ماه",
            cooldown: "30 روز بین هر ادعا"
        },
        ownershipTransfer: {
            description: "کاربران می‌توانند موقعیت خود در درخت را به آدرس دیگری منتقل کنند",
            includes: "تمام تاریخچه و امتیازهای کاربر",
            restriction: "موقعیت ریشه (شاخه 1) قابل انتقال نیست"
        },
        title: "ویژگی‌های ویژه و امکانات"
    },

    // امنیت و محدودیت‌ها
    security: {
        reentrancyGuard: "جلوگیری از حملات بازگشتی",
        timeLimits: [
            "ادعای پاداش باینری هر 12 ساعت یکبار",
            "افزایش سقف امتیاز هر 4 هفته یکبار"
        ],
        transactionValidation: "تمام تراکنش‌ها باید موفق باشند وگرنه برگشت می‌خورند",
        title: "امنیت و محدودیت‌ها"
    },

    // رویدادها (Events)
    events: [
        "خرید/فروش توکن: ثبت تمام معاملات",
        "تغییرات درخت: ثبت اضافه شدن کاربران جدید", 
        "تغییرات امتیازها: ثبت تغییرات در امتیازهای باینری",
        "توزیع پاداش: ثبت تمام پرداخت‌های پاداش"
    ],
    title: "رویدادها و گزارش‌ها",

    // بازارهای مالی و ارز دیجیتال
    financialMarkets: {
        title: "آموزش بازارهای مالی و ارز دیجیتال",
        summary: "اطلاعات جامع درباره فارکس، کریپتو، مدل‌های بازاریابی، توکنومیکس و ریسک‌ها.",
        subtopics: [
            {
                id: "forex-intro",
                title: "فارکس چیست؟",
                content: `بزرگترین بازار مالی دنیا برای تبادل ارزهای خارجی است. حجم معاملات روزانه بیش از ۶ تریلیون دلار است.`
            },
            {
                id: "forex-concepts",
                title: "مفاهیم اصلی فارکس",
                content: `جفت ارز (EUR/USD)، اسپرد (تفاوت قیمت خرید و فروش)، لات (واحد حجم معامله)، پیپ (کوچک‌ترین تغییر قیمت)، لوریج (اهرم)`
            },
            {
                id: "forex-broker",
                title: "بروکر (Broker) چیست؟",
                content: `کارگزاری است که امکان معامله در بازار فارکس را برای مشتریان فراهم می‌کند.`
            },
            {
                id: "forex-account-types",
                title: "انواع حساب‌ها در فارکس",
                content: `Standard، ECN، Micro، Zero Spread`
            },
            {
                id: "forex-regulation",
                title: "رگولاتوری در فارکس",
                content: `نهادهای قانونی که بروکرها را نظارت می‌کنند، مثل: FCA (انگلستان)، CySEC (قبرس)، ASIC (استرالیا)`
            },
            {
                id: "ib-in-forex",
                title: "IB (Introducing Broker)",
                content: `افرادی که مشتری جذب می‌کنند و از معاملات آن‌ها کمیسیون می‌گیرند.`
            },
            {
                id: "agent-in-forex",
                title: "Agent در فارکس",
                content: `علاوه بر معرفی بروکر، خدمات آموزشی، سیگنال یا مدیریت سرمایه می‌دهد. از تریدر یا بروکر درآمد دارد.`
            },
            {
                id: "lp-in-forex",
                title: "LP (Liquidity Provider)",
                content: `شرکت‌هایی که نقدینگی (Liquidity) بازار را تأمین می‌کنند.`
            },
            {
                id: "forex-trade-types",
                title: "انواع معاملات در فارکس",
                content: `اسپات (Spot)، فیوچرز (Futures)، آپشنز (Options)`
            },
            {
                id: "futures-intro",
                title: "فیوچرز چیست؟",
                content: `قراردادی است که در آن خریدار و فروشنده توافق می‌کنند کالایی (یا دارایی مالی) را در آینده با قیمت مشخص معامله کنند.`
            },
            {
                id: "futures-features",
                title: "ویژگی‌های فیوچرز",
                content: `تاریخ سررسید، اهرم بالا، امکان معامله دو طرفه (خرید یا فروش)، مارجین کال`
            },
            {
                id: "futures-usage",
                title: "کاربرد فیوچرز",
                content: `هج کردن ریسک، سفته‌بازی`
            },
            {
                id: "crypto-intro",
                title: "ارز دیجیتال چیست؟",
                content: `پول یا دارایی دیجیتال مبتنی بر رمزنگاری که روی بلاک‌چین اجرا می‌شود.`
            },
            {
                id: "blockchain-intro",
                title: "بلاک‌چین چیست؟",
                content: `دفتر کل توزیع‌شده که همه تراکنش‌ها را بدون نیاز به شخص ثالث ثبت می‌کند.`
            },
            {
                id: "top-cryptos",
                title: "مهم‌ترین ارزهای دیجیتال",
                content: `Bitcoin (BTC)، Ethereum (ETH)، Binance Coin (BNB)، Solana (SOL)`
            },
            {
                id: "token-types",
                title: "انواع توکن‌ها",
                content: `Coin → بلاک‌چین اختصاصی دارد. (BTC, ETH)\nToken → روی بلاک‌چین دیگر ساخته شده. (USDT روی اتریوم)`
            },
            {
                id: "smart-contract",
                title: "قرارداد هوشمند (Smart Contract)",
                content: `برنامه‌ای که روی بلاک‌چین اجرا می‌شود و بدون دخالت انسان کار می‌کند. مثال: صرافی غیرمتمرکز (DEX)، توکن‌های ERC20`
            },
            {
                id: "wallet-types",
                title: "انواع کیف پول (Wallet)",
                content: `Hot Wallet → متصل به اینترنت (مثلاً MetaMask)\nCold Wallet → آفلاین (مثلاً Ledger)`
            },
            {
                id: "dex-intro",
                title: "DEX چیست؟",
                content: `صرافی غیرمتمرکز مثل Uniswap که معاملات مستقیم روی بلاک‌چین انجام می‌دهد.`
            },
            {
                id: "nft-intro",
                title: "NFT چیست؟",
                content: `توکن غیرقابل‌تعویض برای دارایی‌های دیجیتال مثل آثار هنری، موزیک، بازی‌ها.`
            },
            {
                id: "defi-intro",
                title: "DeFi چیست؟",
                content: `امور مالی غیرمتمرکز (Decentralized Finance) برای وام‌دهی، استیکینگ، ترید غیرمتمرکز.`
            },
            {
                id: "dao-intro",
                title: "DAO چیست؟",
                content: `سازمان خودگردان غیرمتمرکز که تصمیم‌گیری‌ها را با رأی اعضا انجام می‌دهد.`
            },
            {
                id: "marketing-models",
                title: "مدل‌های بازاریابی در بازارهای مالی",
                content: `IB (Introducing Broker): درآمد از بروکر، درصدی از اسپرد یا کمیسیون معاملات تریدرها.\nAgent: درآمد از بروکر + مشتری، ارائه آموزش، سیگنال یا خدمات اضافی.\nAffiliate Marketing: درآمد از ثبت‌نام مشتری، CPA (پرداخت ثابت)، Revenue Share (درصد از کمیسیون معاملات)`
            },
            {
                id: "network-marketing-intro",
                title: "بازاریابی شبکه‌ای (Network Marketing)",
                content: `مدلی از بازاریابی که در آن افراد محصولات یا خدمات را مستقیماً به دیگران معرفی می‌کنند و از فروش زیرشاخه‌ها نیز پورسانت می‌گیرند.`
            },
            {
                id: "network-marketing-models",
                title: "مدل‌های رایج Network Marketing",
                content: `Binary Plan → دو شاخه اصلی\nMatrix Plan → محدودیت عرض و عمق\nUnilevel → عرض نامحدود\nHybrid Plan → ترکیبی از مدل‌ها`
            },
            {
                id: "network-vs-pyramid",
                title: "تفاوت با هرمی",
                content: `هرمی بدون محصول واقعی است. Network Marketing محصول واقعی دارد.`
            },
            {
                id: "tokenomics-intro",
                title: "مدل کسب‌وکار مبتنی بر توکن",
                content: `توکن افزایشی چیست؟ توکنی که قیمتش بر اساس فرمول افزایش می‌یابد (مثلاً در هر خرید قیمت کمی بالاتر می‌رود). مزایا: شفافیت روی بلاک‌چین، غیرمتمرکز، انگیزه خرید و نگهداری برای سرمایه‌گذاران، امکان بازاریابی شبکه‌ای روی بلاک‌چین.`
            },
            {
                id: "tokenomics-example",
                title: "مثال پروژه توکن افزایشی",
                content: `مثل آکادمی سود مستمر: پشتوانه توکن از معاملات واقعی در فارکس و کریپتو، مشارکت IB، ایجنت و بازاریابان، غیرقابل کنترل یا برداشت توسط سازنده (Contract Lock)، امکان استیکینگ و پاداش ماهانه.`
            },
            {
                id: "market-risks",
                title: "ریسک‌های بازارهای مالی و ارز دیجیتال",
                content: `⚠️ نوسانات شدید قیمت\n⚠️ خطر کلاه‌برداری و پروژه‌های پانزی\n⚠️ از دست دادن کل سرمایه\n⚠️ ریسک قانونی در برخی کشورها\n⚠️ ریسک امنیتی (هک کیف پول‌ها)`
            }
        ]
    },

    // معرفی آکادمی سود مستمر
    academyIntro: {
        title: "معرفی آکادمی سود مستمر",
        summary: "آکادمی سود مستمر یک نهاد آموزشی و سرمایه‌گذاری نوآورانه در حوزه بازارهای مالی بین‌المللی است که خدمات متنوعی را با تمرکز بر آموزش، سرمایه‌گذاری، فناوری بلاک‌چین و نوآوری ارائه می‌دهد.",
        subtopics: [
            {
                id: "academy-overview",
                title: "معرفی کلی آکادمی",
                content: `آکادمی سود مستمر یک نهاد آموزشی و سرمایه‌گذاری نوآورانه در حوزه بازارهای مالی بین‌المللی (فارکس و ارزهای دیجیتال) است که با چندین سال سابقه درخشان، خدمات متنوعی را به علاقه‌مندان و فعالان این بازارها ارائه می‌دهد.`
            },
            {
                id: "academy-goals",
                title: "🎯 هدف ما",
                content: `ایجاد بستری قابل اعتماد، آموزشی و سودآور برای همه—from تازه‌کارها تا معامله‌گران حرفه‌ای—با تمرکز بر آموزش، سرمایه‌گذاری، فناوری بلاک‌چین و نوآوری مستمر.`
            },
            {
                id: "academy-services",
                title: "✅ خدمات کلیدی آکادمی",
                content: `🎓 آموزش تخصصی: دوره‌های جامع آموزش فارکس، کریپتو، مدیریت سرمایه، تحلیل تکنیکال و بنیادی\n📡 سیگنال و لایو ترید: ارائه سیگنال‌های دقیق همراه با معاملات زنده برای یادگیری عملی\n🤝 خدمات IB و Agent: معرفی به بروکرها و دریافت کمیسیون یا درآمد از معاملات زیرمجموعه‌ها\n🎫 پاس پراپ: راه‌اندازی و پشتیبانی از حساب‌های Prop Trading برای تریدرهای مستعد\n🔐 ساخت توکن: توسعه و اجرای توکن اختصاصی افزایشی، غیرمتمرکز و خودکنترل‌شونده بر بستر بلاک‌چین`
            },
            {
                id: "academy-innovation-token",
                title: "🚀 نوآوری بزرگ: توکن افزایشی غیرمتمرکز",
                content: `آکادمی سود مستمر با استفاده از تجربه فنی و شناخت دقیق از اقتصاد بازار، یک توکن افزایشی نوآورانه طراحی و عرضه کرده است که:\n💰 با پشتوانه واقعی معاملات در فارکس و کریپتو رشد می‌کند\n🤝 توسط فعالیت‌های ای‌بی، ایجنت و بازاریابی تقویت می‌شود\n🧠 روی یک قرارداد هوشمند غیرقابل تغییر اجرا شده\n🔓 بدون دسترسی مالکیتی از طرف سازنده یا هر فردی است (non-custodial)\n📈 دارای الگوریتم افزایش قیمت خودکار و سیستم پاداش‌دهی ماهانه است`
            },
            {
                id: "academy-why-different",
                title: "💡 چرا آکادمی سود مستمر متفاوت است؟",
                content: `📊 سابقه نتایج واقعی: سال‌ها لایو ترید، نتایج شفاف و رضایت مشتریان\n⛓️ استفاده از بلاک‌چین: شفافیت، غیرمتمرکز بودن و حذف اعتماد به شخص ثالث\n💸 درآمدسازی چندلایه: معامله‌گری + ای‌بی + بازاریابی + پاداش توکن\n🌐 اکوسیستم ترکیبی: هم‌زمان آموزش، خدمات مالی و توکن با کارکرد عملیاتی\n🔐 امنیت بالا: قرارداد هوشمند قفل‌شده، بدون امکان دستکاری از سمت تیم`
            },
            {
                id: "academy-token-functionality",
                title: "📦 کارکرد توکن آکادمی",
                content: `خرید و فروش با افزایش قیمت تدریجی (mechanism of price rising)\nثبت‌نام کاربران و فعال‌سازی جایگاه‌ها در مدل شبه‌باینری\nارائه پاداش و Cashback ماهانه بر اساس دارایی و فعالیت\nاتصال با سیستم بازاریابی و جذب زیرمجموعه`
            },
            {
                id: "academy-trust-future",
                title: "🛡️ اعتمادسازی و آینده‌نگری",
                content: `قرارداد توکن در دسترس عموم (کاملاً شفاف)\nبدون امکان برداشت یا مداخله سازنده (Ownership Renounced)\nساختار درآمدزایی متنوع و قابل مقیاس‌پذیری\nبرنامه توسعه مستمر برای لیست شدن در مارکت‌های غیرمتمرکز و بعد متمرکز (DEX & CEX)`
            },
            {
                id: "academy-conclusion",
                title: "🌍 نتیجه‌گیری",
                content: `آکادمی سود مستمر نه تنها یک مجموعه آموزشی است، بلکه یک پلتفرم جامع مالی است که با تکیه بر تجربه، تکنولوژی بلاک‌چین، و مدل‌های نوین کسب‌وکار، در حال ساخت آینده‌ای متفاوت برای تریدرها، سرمایه‌گذاران و بازاریابان مالی است.`
            }
        ]
    },

    // سوالات متداول و پاسخ‌ها
    faq: {
        "چگونه می‌توانم ثبت‌نام کنم؟": {
            answer: "باید توسط یک عضو موجود معرفی شوید و هزینه ثبت‌نام (بین 100-200 CPA) را پرداخت کنید. این کار از طریق تابع registerAndActivate انجام می‌شود.",
            category: "registration"
        },
        "هزینه ثبت‌نام چقدر است؟": {
            answer: "هزینه متغیر است: اگر تعداد کاربران زیر 1000 باشد: 100 CPA یا 150 CPA (بستگی به موجودی قرارداد). اگر بیشتر از 1000 کاربر باشد: 200 CPA.",
            category: "registration"
        },
        "چگونه می‌توانم توکن بخرم؟": {
            answer: "از تابع buyTokens استفاده کنید و DAI ارسال کنید. حداقل خرید 1 DAI است.",
            category: "trading"
        },
        "پاداش باینری چگونه محاسبه می‌شود؟": {
            answer: "بر اساس تعادل بین زیرمجموعه‌های چپ و راست شما. هر چه تعادل بهتر باشد، پاداش بیشتری دریافت می‌کنید.",
            category: "rewards"
        },
        "هر چند وقت می‌توانم پاداش ادعا کنم؟": {
            answer: "هر 12 ساعت یکبار می‌توانید پاداش باینری ادعا کنید.",
            category: "rewards"
        },
        "Cashback ماهانه چیست؟": {
            answer: "اگر هیچ زیرمجموعه‌ای نداشته باشید، ماهانه 3% از هزینه ثبت‌نام تا سقف 50% به شما بازگردانده می‌شود.",
            category: "rewards"
        },
        "آیا می‌توانم موقعیت خود در درخت را منتقل کنم؟": {
            answer: "بله، با تابع transferIndexOwnership می‌توانید موقعیت خود را به آدرس دیگری منتقل کنید.",
            category: "features"
        },
        "کارمزد معاملات چقدر است؟": {
            answer: "خرید: 2% (1% پشتیبان، 0.5% توسعه‌دهنده، 0.5% معرف). فروش: 2% (همانند خرید).",
            category: "trading"
        },
        "چگونه می‌توانم سقف امتیاز خود را افزایش دهم؟": {
            answer: "با خریدهای مکرر (تابع purchase) و گذشت حداقل 4 هفته از آخرین افزایش.",
            category: "rewards"
        },
        "قیمت توکن چگونه محاسبه می‌شود؟": {
            answer: "قیمت بر اساس نسبت موجودی DAI به عرضه کل توکن‌ها محاسبه می‌شود، با حداقل قیمت 0.001 DAI به ازای هر توکن.",
            category: "trading"
        },
        "فارکس چیست؟": {
            answer: "بزرگترین بازار مالی دنیا برای تبادل ارزهای خارجی است. حجم معاملات روزانه بیش از ۶ تریلیون دلار است.",
            category: "financialMarkets"
        },
        "IB کیست؟": {
            answer: "IB یا Introducing Broker فردی است که مشتری جذب می‌کند و از معاملات آن‌ها کمیسیون می‌گیرد.",
            category: "financialMarkets"
        },
        "تفاوت Agent و IB؟": {
            answer: "IB فقط از بروکر کمیسیون می‌گیرد، اما Agent علاوه بر کمیسیون از بروکر، از تریدر هم بابت آموزش یا خدمات درآمد دارد.",
            category: "financialMarkets"
        },
        "فیوچرز چیست؟": {
            answer: "قراردادی است که در آن خریدار و فروشنده توافق می‌کنند کالایی (یا دارایی مالی) را در آینده با قیمت مشخص معامله کنند.",
            category: "financialMarkets"
        },
        "قرارداد هوشمند یعنی چه؟": {
            answer: "برنامه‌ای که روی بلاک‌چین اجرا می‌شود و بدون دخالت انسان کار می‌کند.",
            category: "financialMarkets"
        },
        "مزایای بلاک‌چین چیست؟": {
            answer: "شفافیت، امنیت، غیرمتمرکز بودن و حذف واسطه‌ها از مزایای اصلی بلاک‌چین است.",
            category: "financialMarkets"
        },
        "توکن افزایشی چیست؟": {
            answer: "توکنی که قیمتش بر اساس فرمول افزایش می‌یابد (مثلاً در هر خرید قیمت کمی بالاتر می‌رود).",
            category: "financialMarkets"
        },
        "تفاوت DEX و CEX؟": {
            answer: "DEX صرافی غیرمتمرکز است که معاملات روی بلاک‌چین انجام می‌شود. CEX صرافی متمرکز است که توسط یک شرکت مدیریت می‌شود.",
            category: "financialMarkets"
        },
        "Network Marketing چیه؟": {
            answer: "مدلی از بازاریابی که در آن افراد محصولات یا خدمات را مستقیماً به دیگران معرفی می‌کنند و از فروش زیرشاخه‌ها نیز پورسانت می‌گیرند.",
            category: "financialMarkets"
        },
        "خطرات کریپتو چی هست؟": {
            answer: "نوسانات شدید قیمت، خطر کلاه‌برداری، از دست دادن کل سرمایه، ریسک قانونی و امنیتی از مهم‌ترین ریسک‌های بازار کریپتو هستند.",
            category: "financialMarkets"
        }
    },

    // نکات فنی مهم
    technicalNotes: [
        "قرارداد از استانداردهای OpenZeppelin برای ERC-20 و ReentrancyGuard استفاده می‌کند",
        "تمام محاسبات مالی با دقت 18 رقم اعشار انجام می‌شود",
        "تعادل DAI و توکن‌ها به دقت مدیریت می‌شود تا از حملات اقتصادی جلوگیری شود",
        "سیستم درختی به صورت خودکار متعادل می‌شود (کاربران جدید در شاخه‌های کمتر پر قرار می‌گیرند)"
    ],

    // توابع مهم قرارداد
    importantFunctions: {
        "registerAndActivate": "ثبت‌نام و فعال‌سازی کاربر جدید",
        "buyTokens": "خرید توکن با DAI",
        "sellTokens": "فروش توکن و دریافت DAI",
        "claim": "ادعای پاداش باینری",
        "claimMonthlyReward": "ادعای پاداش ماهانه",
        "transferIndexOwnership": "انتقال مالکیت موقعیت در درخت",
        "purchase": "خرید و افزایش سقف امتیاز",
        "getTokenPrice": "دریافت قیمت فعلی توکن",
        "getRegPrice": "دریافت هزینه ثبت‌نام",
        "getUserTree": "دریافت اطلاعات درختی کاربر"
    },

    // پاسخ‌های آماده برای دستیار هوشمند
    assistantResponses: {
        welcome: "به CONTINUOUS PROFIT ACADEMY خوش آمدید! 🚀\n\nمن دستیار هوشمند CPA هستم و می‌توانم به سوالات شما درباره قرارداد هوشمند، سیستم پاداش باینری، خرید و فروش توکن‌ها و سایر خدمات پلتفرم پاسخ دهم.\n\nچه کمکی از دستم بر می‌آید؟",
        
        registration: "📝 برای ثبت‌نام در CPA:\n\n• نیاز به معرف دارید\n• هزینه ثبت‌نام: 100-200 CPA (بسته به تعداد کاربران)\n• از تابع registerAndActivate استفاده کنید\n\nآیا معرف دارید؟",
        
        trading: "💱 سیستم خرید و فروش CPA:\n\n🔵 خرید توکن:\n• حداقل: 1 DAI\n• کارمزد: 2% (1% پشتیبان، 0.5% توسعه‌دهنده، 0.5% معرف)\n• 98% برای خریدار\n\n🔴 فروش توکن:\n• حداقل: 1 CPA\n• کارمزد: 2% (همانند خرید)\n• 98% برای فروشنده\n\nقیمت بر اساس عرضه و تقاضا محاسبه می‌شود.",
        
        rewards: "🎯 سیستم پاداش باینری:\n\n• سقف اولیه: 5 امتیاز\n• سقف حداکثر: 100 امتیاز\n• ادعا هر 12 ساعت یکبار\n• پاداش = امتیاز × ارزش هر امتیاز\n\n💝 Cashback ماهانه:\n• برای کاربران بدون زیرمجموعه\n• 3% هزینه ثبت‌نام در ماه\n• حداکثر 50% بازگشت",
        
        network: "🌳 ساختار درختی باینری:\n\n• هر کاربر حداکثر 2 زیرمجموعه مستقیم\n• تعادل چپ و راست برای پاداش مهم است\n• کاربران جدید در شاخه‌های کمتر پر قرار می‌گیرند\n• امکان انتقال مالکیت موقعیت وجود دارد",
        
        security: "🔒 امنیت قرارداد:\n\n• استفاده از ReentrancyGuard\n• محدودیت‌های زمانی برای ادعا\n• تایید تمام تراکنش‌ها\n• محاسبات دقیق 18 رقمی\n• مدیریت تعادل DAI و توکن‌ها"
    },

    // مدل‌های بازاریابی و بازاریابی شبکه‌ای
    networkMarketing: {
        title: "مدل‌های بازاریابی و بازاریابی شبکه‌ای",
        summary: "تعریف بازاریابی شبکه‌ای (MLM)، تفاوت با شرکت‌های هرمی، انواع ساختارها و مدل‌های بازاریابی مدرن.",
        subtopics: [
            {
                id: "what-is-network-marketing",
                title: "بازاریابی شبکه‌ای چیست؟",
                content: `بازاریابی شبکه‌ای (Network Marketing) یا بازاریابی چندسطحی (MLM) یک مدل فروش مستقیم است که افراد محصولات یا خدمات شرکت را می‌فروشند و می‌توانند دیگران را هم به عنوان فروشنده جذب کنند. درآمد به دو شکل است: کمیسیون فروش شخصی و درصدی از فروش زیرمجموعه‌ها.\nویژگی‌ها: بدون نیاز به سرمایه زیاد، آموزش بازاریابی، رشد درآمد با افزایش شبکه، درآمد فعال و غیرفعال.`
            },
            {
                id: "network-marketing-advantages-disadvantages",
                title: "مزایا و معایب بازاریابی شبکه‌ای",
                content: `مزایا:\n• فرصت کارآفرینی با سرمایه اندک\n• رشد مهارت‌های فردی و ارتباطی\n• ایجاد درآمد غیرفعال در بلندمدت\n• گاهی تخفیف برای خرید محصولات\n\nمعایب:\n• درآمد بالا تضمین نیست\n• گاهی تمرکز شرکت‌ها بیشتر بر جذب نفرات جدید است تا فروش واقعی\n• ممکن است به مدل‌های هرمی غیرقانونی شبیه شود\n• فشار زیاد برای فروش یا جذب عضو جدید\n• برخی کشورها محدودیت‌های قانونی دارند.`
            },
            {
                id: "network-vs-pyramid",
                title: "تفاوت بازاریابی شبکه‌ای و شرکت‌های هرمی",
                content: `بازاریابی شبکه‌ای (MLM): محصول یا خدمت واقعی دارد، درآمد از فروش واقعی کالا، در بسیاری کشورها قانونی است، کمیسیون شفاف و مشخص است.\nشرکت هرمی: اغلب محصولی وجود ندارد یا صوری است، درآمد فقط از جذب افراد جدید، در اکثر کشورها غیرقانونی است، کمیسیون معمولاً مبهم و مبنی بر ورودی نفرات جدید.`
            },
            {
                id: "network-structure-models",
                title: "مدل‌های ساختار در بازاریابی شبکه‌ای",
                content: `Unilevel Plan: همه زیرمجموعه‌ها مستقیماً زیر شما قرار می‌گیرند و محدودیت در تعداد نفرات سطح اول وجود ندارد.\nBinary Plan (پلن باینری): هر نفر فقط دو زیرمجموعه مستقیم می‌تواند داشته باشد، شبکه به دو شاخه تقسیم می‌شود (Left Leg / Right Leg)، درآمد بستگی به تعادل بین دو شاخه دارد.\nMatrix Plan: ساختار جدولی (مثلاً ۳×۳ یا ۵×7)، محدودیت در تعداد افراد در هر سطح، نفرات اضافی به لایه‌های پایین‌تر Spillover می‌شوند.\nBreakaway Plan: وقتی یک زیرمجموعه به حجم فروش خاصی برسد، از شبکه شما جدا شده و تیم مستقل می‌شود، درصد پورسانت از تیم جداشده کمتر می‌شود.`
            },
            {
                id: "marketing-models-list",
                title: "انواع مدل‌های بازاریابی (Marketing Models)",
                content: `بازاریابی مستقیم (Direct Marketing): ارتباط مستقیم کسب‌وکار با مشتری بدون واسطه (ایمیل مارکتینگ، پیامک تبلیغاتی، تماس تلفنی).\nبازاریابی محتوا (Content Marketing): تولید محتوا مفید برای جذب مخاطب (وبلاگ، ویدئو، اینفوگرافیک).\nبازاریابی دیجیتال (Digital Marketing): استفاده از فضای اینترنت برای تبلیغ (SEO، تبلیغات کلیکی، شبکه‌های اجتماعی، ایمیل مارکتینگ).\nبازاریابی دهان به دهان (Word of Mouth): افراد تجربه خود را به دیگران منتقل می‌کنند.\nبازاریابی عصبی (Neuromarketing): استفاده از علم مغز و روانشناسی برای طراحی تبلیغات مؤثرتر.\nبازاریابی رابطه‌ای (Relationship Marketing): تمرکز بر حفظ مشتریان قدیمی و ایجاد وفاداری.\nبازاریابی ویروسی (Viral Marketing): محتوایی که به سرعت بین مردم دست‌به‌دست می‌شود.\nبازاریابی سبز (Green Marketing): تأکید بر حفاظت محیط‌زیست در تولید و تبلیغ محصولات.\nبازاریابی احساسی (Emotional Marketing): تمرکز بر احساسات مشتریان برای اثرگذاری بیشتر.\nبازاریابی چریکی (Guerrilla Marketing): روش‌های خلاقانه و کم‌هزینه برای جلب توجه سریع.\nبازاریابی بین‌المللی (International Marketing): فروش محصولات یا خدمات در بازارهای خارجی.`
            }
        ]
    },

    // دستورات مفید
    usefulCommands: {
        "قیمت توکن": "برای مشاهده قیمت فعلی CPA",
        "موجودی من": "برای مشاهده موجودی‌های شما",
        "شبکه من": "برای مشاهده ساختار درختی شما",
        "پاداش‌ها": "برای مشاهده پاداش‌های قابل ادعا",
        "تاریخچه": "برای مشاهده تاریخچه تراکنش‌ها",
        "راهنما": "برای مشاهده راهنمای کامل"
    }
};

// تابع کمکی برای جستجو در دانش
window.searchKnowledgeBase = function(query) {
    const knowledge = window.CPA_KNOWLEDGE_BASE;
    query = query.toLowerCase();
    
    // جستجو در FAQ
    for (const [question, answer] of Object.entries(knowledge.faq)) {
        if (question.toLowerCase().includes(query) || 
            answer.answer.toLowerCase().includes(query)) {
            return {
                type: 'faq',
                question: question,
                answer: answer.answer,
                category: answer.category
            };
        }
    }
    
    // جستجو در پاسخ‌های آماده
    for (const [key, response] of Object.entries(knowledge.assistantResponses)) {
        if (response.toLowerCase().includes(query)) {
            return {
                type: 'response',
                key: key,
                response: response
            };
        }
    }
    
    // جستجو در توابع
    for (const [func, description] of Object.entries(knowledge.importantFunctions)) {
        if (func.toLowerCase().includes(query) || 
            description.toLowerCase().includes(query)) {
            return {
                type: 'function',
                function: func,
                description: description
            };
        }
    }
    
    return null;
};

// تابع برای دریافت پاسخ مناسب
window.getAssistantResponse = function(userQuery) {
    const searchResult = window.searchKnowledgeBase(userQuery);
    
    if (searchResult) {
        switch (searchResult.type) {
            case 'faq':
                return `❓ ${searchResult.question}\n\n✅ ${searchResult.answer}`;
            case 'response':
                return searchResult.response;
            case 'function':
                return `🔧 تابع: ${searchResult.function}\n\n📝 ${searchResult.description}`;
        }
    }
    
    // پاسخ پیش‌فرض
    return `متأسفانه پاسخ دقیقی برای سوال شما پیدا نکردم. 😕\n\nلطفاً سوال خود را به شکل دیگری مطرح کنید یا از دستورات زیر استفاده کنید:\n\n${Object.entries(window.CPA_KNOWLEDGE_BASE.usefulCommands).map(([cmd, desc]) => `• ${cmd}: ${desc}`).join('\n')}`;
};

console.log('✅ CPA Knowledge Base loaded successfully!'); 