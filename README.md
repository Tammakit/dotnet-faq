# .NET FAQ 
FAQ from [.NET Thailand group](https://www.facebook.com/groups/dotnetthailand)

คำถามที่มักเจอบ่อยๆ ในกลุ่ม [.NET Thailand group](https://www.facebook.com/groups/dotnetthailand)

### จะใช้ Report อะไรดี
- แนะนำ report list ใน [**Awesome .NET Thailand**](https://github.com/dotnetthailand/awesome-dotnet-thailand#report) ครับ

### .NET Core สามารถใช้งาน Crystal Report ในการ export PDF ได้ไหมครับ หรือใช้ได้แค่เฉพาะ .NET Framework ?
- ใช้ Crystal Report กับ .NET Core ไม่ได้ครับ
- [Is it possible to display Crystal Report in ASP.Net Core Application](https://forums.asp.net/post/6236009.aspx)
- [SAP Crystal Reports 2016 Supported Platforms (PAM)](https://www.sap.com/documents/2016/04/3050374d-6a7c-0010-82c7-eda71af511fa.html)

### Async checklist, make sure you have done these items when working with asynchronous programming.
- [ ] Use async/await all the way.
- [ ] Don't use blocking method e.g. `Task.WaitAll()`, `.Result`, `.Wait()`. [Read more](https://blog.stephencleary.com/2012/07/dont-block-on-async-code.html)
- [ ] Use **async Task** for a method that does not return a value.
- [ ] Use **async Task\<TResult\>** for a method that returns a value.
- [ ] Use **async void** only for an event handler e.g in Windows App. [Read more](https://app.pluralsight.com/guides/returning-void-from-c-async-method) 
- [ ] Add **Async** suffix to async method's name.
- [ ] Use **configureAwait(false)** for a class library. [Read more](https://app.pluralsight.com/guides/advanced-tips-using-task-run-async-wait#module-dontcontinueonthemainthreadunnecessarily)
- [ ] Avoid unnecessary use of async modifier if we don't need to resume a main thread/UI thread to do anything after a task is complete, just return a task and don't await. Do not wrap a task in try/catch block because it has never throwed an exception. [Read more](https://github.com/agoda-com/standards-c-sharp/blob/master/docs/async/avoid-unnecessary-async.md)
- [ ] In a using block, always await a task because we want to dispose a resource object after a task has been complete. Read more [REF](https://stackoverflow.com/a/19103343/1872200) and [REF](http://www.thebillwagner.com/blog/Item/2017-05-03-ThecuriouscaseofasyncawaitandIDisposable)
- [ ] Use await when you want to do stuff in an UI thread after getting a result. With await you can handle an exception as usual.
- [ ] Lambda expression supports async keyword, you can put async before Lambda parameters and put await in Lambda body.
- [ ] `Task.Run` without await lead to "fire and forget" behavior. Use it for CPU Bound task. It will execute code in a thread of ThreadPool. Prefer `Task.Run` over `Task.Factory.StartNew` and over `new Task()` [Read more](https://github.com/agoda-com/standards-c-sharp/blob/master/docs/async/task-run.md)
- [ ] Use async for IO bound. It is good for scalability and does not require extra thread so you don't use a thread just for waiting a long-running IO process. [Read more](https://app.pluralsight.com/guides/using-task-run-async-await)
- [ ] Avoid mixing synchronous and asynchronous code. [Read more](https://github.com/agoda-com/standards-c-sharp/blob/master/docs/async/avoid-mixing-async-sync.md)
- [ ] Avoid race conditions with proper synchronization. [Read more](https://github.com/agoda-com/standards-c-sharp/blob/master/docs/async/avoid-race-conditions.md)
- [ ] When you develop interfaces do not expose both sync and async versions of methods. [Read more](https://github.com/agoda-com/standards-c-sharp/blob/master/docs/async/expose-async-method.md)
- [ ] Use await instead of `Task.ContinueWith`. [Read more](https://github.com/agoda-com/standards-c-sharp/blob/master/docs/async/never-task-continue-with.md)
- [ ] Use await `Task.WhenAny/All` instead of `Task.WaitAny/All`. [Read more] (https://github.com/agoda-com/standards-c-sharp/blob/master/docs/async/when-any-all.md)

### .NET Core ใช้ library ตัวไหนอ่านเขียน Excel ดี?
- แนะนำ Excel library list ในนี้ครับ https://github.com/dotnetthailand/awesome-dotnet-thailand#excel-word

### .NET Core ใช้ library ตัวไหนสร้าง PDF file ดี
- แนะนำ PDF library list ในนี้ครับ https://github.com/dotnetthailand/awesome-dotnet-thailand#pdf

### .NET ใช้ CMS หรือ E-Commerce ตัวไหนดี
- [Orchard CMS](https://github.com/OrchardCMS/Orchard) .NET Framework CMS
- [OrchardCore CMS](https://github.com/OrchardCMS/OrchardCore) .NET Core CMS a newer version of Orchard CMS
- [nopCommerce](https://github.com/nopSolutions/nopCommerce) .NET Core e-commerce website
- [Comparison of Orhcard vs OrchardCore vs nopCommerce](https://docs.google.com/document/d/1YqU-rI_UdWQD2_KjCZLA5C-lQ3Z57gGctaBKvb4GRQc/edit)
- [Intro to Orchard CMS](https://docs.google.com/document/d/1SdrQ9f33uU0CfxgEp3-6kIsL9IgTcTNy5LnXHbQHgPg/edit)

### Flutter, React Native หรือ Xamarin ดี สำหรับงาน cross-platform mobile development 

- ตัดเรื่อง programming language ออกไป และมองในมุมมองของ performance, community, learning curve
Xamarin
- **Xamarin Native**
  - iOS, compilation เป็น AOT อยู่แล้ว performance ใกล้เคียง native
  - Android, compilation เป็น JIT ยังต้องพึ่ง Mono Runtime ทำให้ startup time และ performance ด้อยกว่า native
  - คนสร้าง Xamarin.Native ก่อนโดน MS ซื้อ เค้าวาง concept ว่าส่วนของ UI ไม่สามารถเขียนทีเดียวแล้วใช้ทั้ง 2 platform ได้ เพราะ UX/UI ของ 2 OS แตกต่างกันสิ้นเชิง (อันนี้เห็นด้วย)
  - iOS สามารถใช้ XCode จัด layout ได้ หรือใช้ Android Studio สำหรับ Android
  - Xamarin.Native ตัว framework แทบจะลอก API ของ native มาเลย คือถ้าเขียน native เป็นนี่ปรับตัวไม่ยาก ซึ่งมันก็กลายเป็นข้อเสียเหมือนกัน เพราะคนไม่ได้มาสายนี้ learning curve จะสูงมาก
  - Xamarin.Native เพิ่งมี Hot Reload เป็น feature ที่มาช้ากว่าคนอื่นมาก
  - .NET Community สำหรับ Xamarin ในไทยไม่ active

- **Xamarin.Form**
  - Xamarin.Form แม้จะเขียน code เพียงชุดเดียว แต่หน้าตาออกมาระหว่าง iOS กับ Android ยังไม่เหมือนกัน
  - Free Widgets ยังน้อยอยู่

- **React Native**
  - JS Core & Bridge คือฝันร้าย performance แย่กว่า native แบบเห็นได้ชัด, binary ขนาดเทอะทะ (เห็นว่ากำลัง re-architecture แต่ไม่มั่นใจไปถึงไหนแล้ว)
  - มาจากสาย web learning curve ต่ำมาก หรือกลับกันเรียนรู้ React Native แล้วกลับไปทำ web ก็ง่ายเช่นกัน
  - Component ก็ยังมีความ platform-specific นิดนึงคือไม่ใช่เขียนทีเดียวแล้วได้ 2 OS ยังต้องมีปรับเล็กน้อย โดย เฉพาะเรื่อง font size, padding, margin
  - JS community ใหญ่จริง libs, component ให้ใช้เพียบ และผ่านการพิสูจน์ตัวเองมาหลายปีแล้วว่าเป็น industry-standard ของการพัฒนา mobile cross-platform
  - Hot & Live Reload

- **Flutter**
  - เรื่อง rendering ที่คือจุดขายที่แตกต่างจากเจ้าอื่นซึ่ง Flutter ทำ canvas เองไม่ได้ compile เป็น native assembly แล้วไป render ผ่าน Native UI เหมือนเจ้าอื่น, Skia graphic library นี่คือของจริง ที่เคลมว่า framerate 60 นี่ไม่ใช่คำอ้างที่ทำงานได้ดีแค่บน high-end device แต่ backward ไปยัน device 4-5 ปีที่แล้ว เอา iPhone 6s, 6 มาใช้ยังลื่นมาก ๆ ประสบการณ์ใช้งานประทับใจ
  - Widget ถ้ามาทาง design principle อย่าง material design จะง่ายมาก มีของให้ใช้เพียบ, Google ทำการบ้านมาดีมาก โดยเฉพาะที่เค้าวาง design concept ว่าเป็น composition over inheritance เหมือนเราเอาคุณสมบัติเล็ก ๆ มา compose จนออกมาเป็น Widget อันนี้ประทับใจกว่าที่ทำบน Native Android ซะอีก
  - Widget ไม่ต้องมานั่ง adjust แต่ละ platform จุกจิก เหมือน React Native ด้วยความที่ทำส่วน rendering เอง
  - Community โตไวมาก จาก project ที่ใช้จะใช้อะไรที่เป็น platform-specific มีให้เกือบหมด, แทบไม่ต้องเขียน native plugin มาใช้เองเลย
  - ️Hot Reload
  - Free widget เยอะมาก

- สรุป ถ้าวิเคราะห์เฉพาะ cross-Platform ตอนนี้ต้องยก Flutter คืออนาคตครับ 
  - Dart ถือว่าสอบผ่านในความเป็น modern programming language อย่างที่ควรจะเป็น 
  - ตัวภาษาไม่ได้เรียนรู้ยากครับเขียน Typescript, Kotlin, Swift มาอ่าน handbook สักสองวันก็ไปลุยได้แล้ว
- Credit จาก comment ของคุณ Cartier Saengchaiarun ครับ และทุกๆ ท่านจาก group .NET Thailand ครับ
- REF 
  - [https://www.facebook.com/groups/dotnetthailand/permalink/3474289265990239/](https://www.facebook.com/groups/dotnetthailand/permalink/3474289265990239/)
  - [https://www.facebook.com/groups/dotnetthailand/permalink/2986011671484670/](https://www.facebook.com/groups/dotnetthailand/permalink/2986011671484670/)

### .NET free & open source ใช่ไหมครับ
- .NET 5 ที่พัฒนาจาก .NET Core free & open source ครับ
- ทั้ง programming languages (C#, VB.NET, F#), compilers, libraries, และ runtimes ฟรีและ open source หมด 
- ไม่มีค่า license สามารถใช้งานเพื่อการค้าโดยไม่มีค่าใช้จ่ายเพิ่มเติม
- [.NET runtime repository](https://github.com/dotnet/runtime)
- [ASP.NET Core repository](https://github.com/dotnet/aspnetcore)
- [Roslyn C#, VB.NET compiler repository](https://github.com/dotnet/roslyn)
- [F# compiler, F# core library, and F# editor tools repository](https://github.com/dotnet/fsharp)

