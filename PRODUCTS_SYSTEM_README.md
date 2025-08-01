# سیستم محصولات و فروشندگان CPA Forex

## بررسی کلی

این سیستم امکان فروش محصولات و خدمات را از طریق قرارداد هوشمند CPA Forex فراهم می‌کند. هر فروشنده می‌تواند محصولات خود را ثبت کند و خریداران می‌توانند با استفاده از توکن CPA خریداری کنند.

## ساختار فایل‌ها

### فایل‌های اصلی
- `products.html` - صفحه اصلی محصولات
- `js/products-manager.js` - مدیریت محصولات و فروشندگان
- `seller1.html` - نمونه صفحه فروشنده

### فایل‌های نمونه فروشندگان
- `seller1.html` - آکادمی فارکس
- `seller2.html` - تیم سیگنال (قابل ایجاد)
- `seller3.html` - تیم ربات (قابل ایجاد)

## ویژگی‌های سیستم

### 1. مدیریت محصولات
- افزودن/حذف محصولات
- تعیین قیمت و درصد تبلیغات
- تصاویر و توضیحات محصولات
- فیلتر و جستجو

### 2. مدیریت فروشندگان
- ثبت فروشندگان جدید
- ایجاد صفحات اختصاصی
- مدیریت اطلاعات تماس
- آمار فروش

### 3. سیستم خرید
- خرید با توکن CPA
- توزیع خودکار درآمد
- ثبت تراکنش‌ها
- تأیید کیف پول

### 4. پنل ادمین
- دسترسی فقط برای ایندکس‌های 1، 2، 3
- مدیریت فروشندگان
- مدیریت محصولات
- مدیریت ساب ادمین‌ها

## تابع Purchase قرارداد

```solidity
function purchase(uint256 amountCPA, uint256 payout, address seller) external nonReentrant {
    require(users[msg.sender].activated, "not registered");
    require(amountCPA > 0, "Amount must be greater than 0");
    require(payout <= 100 && payout > 0, "Invalid payout percent");

    uint256 regprice = regPrice();
    
    _burn(msg.sender, amountCPA);
    uint256 uptopoint = regprice / 3;
    uint256 tokensForBinary = (amountCPA * payout) / 100;
    uint256 tokensForSeller = amountCPA - tokensForBinary;

    _mint(address(this), tokensForBinary);
    _mint(seller, tokensForSeller);

    // ... سایر منطق قرارداد
}
```

### پارامترهای تابع Purchase
- `amountCPA`: مقدار توکن CPA برای خرید
- `payout`: درصد سهم تبلیغات (1-100)
- `seller`: آدرس فروشنده

### توزیع درآمد
- درصد `payout` به قرارداد (برای تبلیغات)
- مابقی به آدرس فروشنده

## نحوه استفاده

### برای خریداران
1. به صفحه `products.html` بروید
2. محصول مورد نظر را انتخاب کنید
3. مقدار CPA را وارد کنید
4. کیف پول را متصل کنید
5. خرید را تأیید کنید

### برای فروشندگان
1. با ادمین تماس بگیرید
2. اطلاعات فروشنده ثبت می‌شود
3. محصولات اضافه می‌شوند
4. صفحه اختصاصی ایجاد می‌شود

### برای ادمین‌ها
1. کیف پول با ایندکس 1، 2 یا 3 متصل کنید
2. پنل ادمین نمایش داده می‌شود
3. فروشندگان و محصولات را مدیریت کنید

## ذخیره‌سازی داده‌ها

### LocalStorage
- `cpa_products`: لیست محصولات
- `cpa_sellers`: لیست فروشندگان
- `cpa_subadmins`: لیست ساب ادمین‌ها
- `cpa_transactions`: تاریخچه تراکنش‌ها

### ساختار داده محصول
```javascript
{
    id: 1,
    title: "عنوان محصول",
    description: "توضیحات محصول",
    price: 500,
    payout: 20,
    seller: "0x...",
    sellerName: "نام فروشنده",
    image: "📚",
    sellerPageUrl: "seller1.html",
    createdAt: "2024-01-01T00:00:00.000Z"
}
```

### ساختار داده فروشنده
```javascript
{
    address: "0x...",
    name: "نام فروشنده",
    pageUrl: "seller1.html",
    description: "توضیحات فروشنده",
    createdAt: "2024-01-01T00:00:00.000Z"
}
```

## امنیت و دسترسی

### بررسی دسترسی ادمین
```javascript
async function checkAdminAccess() {
    const { contract } = await window.connectWallet();
    const userIndex = await contract.getUserIndex(userAddress);
    return userIndex >= 1 && userIndex <= 3;
}
```

### بررسی کیف پول
- اتصال کیف پول الزامی است
- بررسی موجودی CPA
- تأیید تراکنش

## توسعه و سفارشی‌سازی

### افزودن فروشنده جدید
1. فایل HTML جدید ایجاد کنید (مثل `seller2.html`)
2. در پنل ادمین فروشنده را ثبت کنید
3. محصولات را اضافه کنید

### تغییر ظاهر
- فایل‌های CSS موجود را ویرایش کنید
- استایل‌های جدید اضافه کنید
- رنگ‌بندی و فونت‌ها را تغییر دهید

### افزودن ویژگی‌های جدید
- سیستم امتیازدهی
- نظرات مشتریان
- سیستم تخفیف
- گزارش‌های پیشرفته

## عیب‌یابی

### مشکلات رایج
1. **کیف پول متصل نیست**: ابتدا کیف پول را متصل کنید
2. **موجودی ناکافی**: CPA کافی در کیف پول داشته باشید
3. **خطای قرارداد**: شبکه و آدرس قرارداد را بررسی کنید
4. **دسترسی ادمین**: ایندکس کاربر باید 1، 2 یا 3 باشد

### لاگ‌ها
- خطاها در کنسول مرورگر نمایش داده می‌شوند
- تراکنش‌ها در localStorage ذخیره می‌شوند
- آمار در پنل ادمین قابل مشاهده است

## آینده‌نگری

### ویژگی‌های پیشنهادی
- سیستم امتیازدهی و نظرات
- سیستم تخفیف و کد تخفیف
- گزارش‌های پیشرفته فروش
- سیستم اعلان‌ها
- API برای توسعه‌دهندگان
- سیستم پرداخت چندگانه

### بهینه‌سازی
- کش کردن داده‌ها
- لودینگ بهینه
- SEO بهبود یافته
- PWA قابلیت‌ها

## پشتیبانی

برای سوالات و مشکلات:
- بررسی فایل‌های README
- مراجعه به مستندات قرارداد
- تماس با تیم توسعه

---

**توجه**: این سیستم در حال توسعه است و ممکن است تغییراتی در آینده داشته باشد. 