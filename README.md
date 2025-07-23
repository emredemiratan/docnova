# DocNova - Fatura Yönetim Uygulaması

Bu proje, React, Vite, Redux Toolkit ve Ant Design kullanılarak geliştirilmiş modern bir fatura yönetim uygulamasıdır. Kullanıcıların faturalarını listelemelerine, detaylarını görüntülemelerine ve yeni faturalar oluşturmalarına olanak tanır. Uygulama, çoklu dil desteği ve tema değiştirme gibi özellikler de sunmaktadır.

[Docnova Fatura Yönetim Paneli ](https://docnova-ovzy.vercel.app/) - https://docnova-ovzy.vercel.app

## Kullanılan Teknolojiler

•⁠ ⁠*Frontend:*

-  [React](https://react.dev/) - Kullanıcı arayüzü oluşturmak için kullanılan kütüphane.
-  [Vite](https://vitejs.dev/) - Hızlı ve modern bir geliştirme ortamı.
-  [TypeScript](https://www.typescriptlang.org/) - JavaScript'e statik tipler ekleyen dil.
   •⁠ ⁠*State Yönetimi:*
-  [Redux Toolkit](https://redux-toolkit.js.org/) - Redux ile state yönetimi için standartlaştırılmış ve basitleştirilmiş bir araç seti.
   •⁠ ⁠*Routing:*
-  [React Router DOM](https://reactrouter.com/) - Tek sayfa uygulamalarında (SPA) dinamik yönlendirme için.
   •⁠ ⁠*UI Kütüphanesi:*
-  [Ant Design](https://ant.design/) - Yüksek kaliteli ve yeniden kullanılabilir UI bileşenleri sunan bir kütüphane.
   •⁠ ⁠*API İstekleri:*
-  [Axios](https://axios-http.com/) - Promise tabanlı HTTP istemcisi.
   •⁠ ⁠*Uluslararasılaştırma (i18n):*
-  [i18next](https://www.i18next.com/) - JavaScript uygulamaları için uluslararasılaştırma (i18n) çerçevesi.
-  [react-i18next](https://react.i18next.com/) - i18next'in React'e entegrasyonu.
   •⁠ ⁠*Bildirimler:*
-  [React Toastify](https://fkhadra.github.io/react-toastify/introduction) - Kullanıcı dostu bildirimler göstermek için.

## Proje Yapısı

Proje, modüler ve organize bir yapıya sahiptir. Ana dizinler ve sorumlulukları aşağıda açıklanmıştır:

src/
├── App.tsx # Ana uygulama bileşeni ve yönlendirici (router) yapılandırması
├── main.tsx # Uygulamanın giriş noktası
├── components/ # Yeniden kullanılabilir UI bileşenleri (Header, LanguageSwitcher vb.)
├── pages/ # Uygulama sayfaları (Login, InvoiceList, InvoiceDetail)
├── redux/ # Redux store ve slice'ların yönetimi
│ ├── slices/ # State dilimleri (userSlice, invoiceSlice, themeSlice)
│ └── store.ts # Redux store'un yapılandırılması
├── services/ # API istekleri ve diğer dış servislerle iletişim
│ └── api.ts # Axios yapılandırması ve interceptor'lar
├── i18n/ # Uluslararasılaştırma dosyaları (tr.json, en.json)
├── types/ # TypeScript tip tanımlamaları
└── assets/ # Statik varlıklar (resimler, ikonlar vb.)

### Temel Özellikler

•⁠ ⁠*Kullanıcı Girişi:* Kullanıcılar sisteme giriş yapabilir.
•⁠ ⁠*Fatura Listeleme:* Kullanıcılar mevcut faturalarını bir liste halinde görebilir.
•⁠ ⁠*Fatura Detayları:* Her faturanın detayları ayrı bir sayfada görüntülenebilir.
•⁠ ⁠*Korunan Yollar (Protected Routes):* Sadece giriş yapmış kullanıcılar fatura sayfalarına erişebilir.
•⁠ ⁠*Çoklu Dil Desteği:* İngilizce ve Türkçe dilleri arasında geçiş yapılabilir.
•⁠ ⁠*Tema Değiştirme:* Açık ve koyu tema arasında geçiş yapma özelliği.
•⁠ ⁠*Global Hata Yönetimi:* API'den dönen hatalar yakalanır ve kullanıcıya bildirim olarak gösterilir.

## Kurulum ve Başlatma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1. _Bağımlılıkları Yükleyin:_
   ⁠ bash
   yarn install
    ⁠
   veya
   ⁠ bash
   npm install
    ⁠

2. _Geliştirme Sunucusunu Başlatın:_
   ⁠ bash
   yarn dev
    ⁠
   veya
   ⁠ bash
   npm run dev
    ⁠
   Uygulama ⁠ http://localhost:5173 ⁠ (veya Vite'in belirlediği başka bir port) üzerinde çalışmaya başlayacaktır.

## Mevcut Komut Dosyaları

•⁠ ⁠⁠ dev ⁠: Geliştirme sunucusunu başlatır.
•⁠ ⁠⁠ build ⁠: Projeyi üretim için derler.
•⁠ ⁠⁠ lint ⁠: ESLint ile kod analizi yapar.
•⁠ ⁠⁠ preview ⁠: Üretim derlemesini yerel olarak önizler.
