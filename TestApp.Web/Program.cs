using TestApp.Web.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("Default");

builder.Services.AddControllersWithViews();
builder.Services.AddScoped<IDataRepository, DataRepository>();
builder.Services.AddSingleton<DatabaseInitializer>();

var app = builder.Build();

app.Services
    .GetRequiredService<DatabaseInitializer>()
    .Init();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllers();

app.MapFallbackToFile("index.html"); ;

app.Run();
