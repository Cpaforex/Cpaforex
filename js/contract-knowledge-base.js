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
        usdcAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        description: "سیستم خرید/فروش توکن، ساختار درختی بازاریابی، سیستم پاداش باینری، cashback ماهانه"
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
        }
    },

    // سیستم خرید و فروش توکن
    trading: {
        buyTokens: {
            minimum: "1 USDC",
            fees: [
                "0.5% برای توسعه‌دهنده",
                "0.5% برای معرف", 
                "1% برای ذخیره پشتیبان",
                "98% برای خریدار"
            ],
            limit: "حداکثر 1% از موجودی USDC قرارداد (اگر موجودی بیش از 100,000 USDC باشد)"
        },
        sellTokens: {
            minimum: "1 توکن CPA",
            fees: [
                "0.5% برای توسعه‌دهنده",
                "0.5% برای معرف",
                "1% برای ذخیره پشتیبان", 
                "98% برای فروشنده"
            ],
            limit: "حداکثر 1% از عرضه کل توکن (اگر موجودی USDC بیش از 500 باشد)"
        },
        priceFormula: {
            description: "قیمت بر اساس نسبت موجودی USDC به عرضه کل توکن‌ها",
            formula: "(موجودی USDC قرارداد * 1e18) / عرضه کل توکن‌ها",
            minimumPrice: "0.001 USDC به ازای هر توکن"
        }
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
        }
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
        }
    },

    // امنیت و محدودیت‌ها
    security: {
        reentrancyGuard: "جلوگیری از حملات بازگشتی",
        timeLimits: [
            "ادعای پاداش باینری هر 12 ساعت یکبار",
            "افزایش سقف امتیاز هر 4 هفته یکبار"
        ],
        transactionValidation: "تمام تراکنش‌ها باید موفق باشند وگرنه برگشت می‌خورند"
    },

    // رویدادها (Events)
    events: [
        "خرید/فروش توکن: ثبت تمام معاملات",
        "تغییرات درخت: ثبت اضافه شدن کاربران جدید", 
        "تغییرات امتیازها: ثبت تغییرات در امتیازهای باینری",
        "توزیع پاداش: ثبت تمام پرداخت‌های پاداش"
    ],

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
            answer: "از تابع buyTokens استفاده کنید و USDC ارسال کنید. حداقل خرید 1 USDC است.",
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
            answer: "قیمت بر اساس نسبت موجودی USDC به عرضه کل توکن‌ها محاسبه می‌شود، با حداقل قیمت 0.001 USDC به ازای هر توکن.",
            category: "trading"
        }
    },

    // نکات فنی مهم
    technicalNotes: [
        "قرارداد از استانداردهای OpenZeppelin برای ERC-20 و ReentrancyGuard استفاده می‌کند",
        "تمام محاسبات مالی با دقت 18 رقم اعشار انجام می‌شود",
        "تعادل USDC و توکن‌ها به دقت مدیریت می‌شود تا از حملات اقتصادی جلوگیری شود",
        "سیستم درختی به صورت خودکار متعادل می‌شود (کاربران جدید در شاخه‌های کمتر پر قرار می‌گیرند)"
    ],

    // توابع مهم قرارداد
    importantFunctions: {
        "registerAndActivate": "ثبت‌نام و فعال‌سازی کاربر جدید",
        "buyTokens": "خرید توکن با USDC",
        "sellTokens": "فروش توکن و دریافت USDC",
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
        
        trading: "💱 سیستم خرید و فروش CPA:\n\n🔵 خرید توکن:\n• حداقل: 1 USDC\n• کارمزد: 2% (1% پشتیبان، 0.5% توسعه‌دهنده، 0.5% معرف)\n• 98% برای خریدار\n\n🔴 فروش توکن:\n• حداقل: 1 CPA\n• کارمزد: 2% (همانند خرید)\n• 98% برای فروشنده\n\nقیمت بر اساس عرضه و تقاضا محاسبه می‌شود.",
        
        rewards: "🎯 سیستم پاداش باینری:\n\n• سقف اولیه: 5 امتیاز\n• سقف حداکثر: 100 امتیاز\n• ادعا هر 12 ساعت یکبار\n• پاداش = امتیاز × ارزش هر امتیاز\n\n💝 Cashback ماهانه:\n• برای کاربران بدون زیرمجموعه\n• 3% هزینه ثبت‌نام در ماه\n• حداکثر 50% بازگشت",
        
        network: "🌳 ساختار درختی باینری:\n\n• هر کاربر حداکثر 2 زیرمجموعه مستقیم\n• تعادل چپ و راست برای پاداش مهم است\n• کاربران جدید در شاخه‌های کمتر پر قرار می‌گیرند\n• امکان انتقال مالکیت موقعیت وجود دارد",
        
        security: "🔒 امنیت قرارداد:\n\n• استفاده از ReentrancyGuard\n• محدودیت‌های زمانی برای ادعا\n• تایید تمام تراکنش‌ها\n• محاسبات دقیق 18 رقمی\n• مدیریت تعادل USDC و توکن‌ها"
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