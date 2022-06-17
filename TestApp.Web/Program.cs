using TestApp.Web.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();
builder.Services.AddScoped<IDataRepository, DataRepository>();
builder.Services.AddSingleton<DbInitService>();

var app = builder.Build();

app.Services
    .GetRequiredService<DbInitService>()
    .InitDb();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllers();

app.MapFallbackToFile("index.html"); ;

app.Run();
