# .NET FAQ 
FAQ from [.NET Thailand group](https://www.facebook.com/groups/dotnetthailand)

คำถามที่มักเจอบ่อยๆ ในกลุ่ม [.NET Thailand group](https://www.facebook.com/groups/dotnetthailand)

### Q: จะใช้ Report อะไรดี
**A:** แนะนำ report list ใน (Awesome .NET Thailand)[https://github.com/dotnetthailand/awesome-dotnet-thailand#report] ครับ

### Q: NET Core 3.1 สามารถใช้งาน Crystal Report ในการ export PDF ได้ไหมครับ หรือใช้ได้แค่เฉพาะ .NET Framework ครับ
**A:** ใช้ Crystal Report กับ .NET Core ไม่ได้ครับ REF: 
- [Is it possible to display Crystal Report in ASP.Net Core Application](https://forums.asp.net/post/6236009.aspx)
- [SAP Crystal Reports 2016 Supported Platforms (PAM)](https://www.sap.com/documents/2016/04/3050374d-6a7c-0010-82c7-eda71af511fa.html)

### Async checklist, make sure you have done these items when working with asynchronous programming.
- [ ] Use async/await all the way.
- [ ] Don't use blocking method e.g. Task.WaitAll(), .Result, .Wait() [Read more](https://blog.stephencleary.com/2012/07/dont-block-on-async-code.html)
- [ ] Use **async Task** for a method that does not return a value.
- [ ] Use **async Task<TResult>** for a method that returns a value.
- [ ] Use **async void** only for an event handler e.g in Windows App. [Read more](https://app.pluralsight.com/guides/returning-void-from-c-async-method) 
- [ ] Add **Async** suffix to async method's name.
- [ ] Use **configureAwait(false)** for a class library. [Read more](https://app.pluralsight.com/guides/advanced-tips-using-task-run-async-wait#module-dontcontinueonthemainthreadunnecessarily)
- [ ] If we don't need to resume a main thread/UI thread, return a task and don't await.
- [ ] Use await when you want to do stuff in UI thread after get a result. With await you can handle an exception as usual. 
- [ ] Lambda expression supports async keyword, you can put async before Lambda parameters and put await in Lambda body.
- [ ] Task.Run without await is fire and forget. Use it for CPU Bound task. It will execute code in ThreadPool thread.
- [ ] Use async for IO bound. It is good for scalability and does not require extra thread so you don't use a thread just for waiting a long-running IO process. [Read more](https://app.pluralsight.com/guides/using-task-run-async-await)