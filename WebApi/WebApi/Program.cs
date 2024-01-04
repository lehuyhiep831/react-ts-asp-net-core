using Microsoft.AspNetCore.Http.Connections;
using Microsoft.EntityFrameworkCore;
using WebApi.Helpers;
using WebApi.Hubs;
using WebApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container. 
{
    // if (app.Environment.IsDevelopment())
    builder.Services.AddDbContext<DataContext, SqliteDataContext>();
    // else (switch to add migration)
    // builder.Services.AddDbContext<DataContext>();

    builder.Services.AddCors();

    // configure automapper with all automapper profiles from this assembly
    builder.Services.AddAutoMapper(typeof(Program));

    // configure strongly typed settings object
    builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

    // configure DI for application services
    builder.Services.AddScoped<IUserService, UserService>();
    builder.Services.AddScoped<INotificationService, NotificationService>();


    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    // Realtime 
    builder.Services.AddSignalR();
}

var app = builder.Build();

// migrate any database changes on startup (includes initial db creation)
using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();
    dataContext.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//app.UseAuthorization();

// global cors policy
app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
    //.AllowCredentials()
    //.WithOrigins("http://localhost:3000/")
    );

// global error handler
app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseRouting().UseEndpoints(endpoints =>
{
    
    endpoints.MapControllers();
    endpoints.MapHub<NotificationHub>("/ws/notification");
});

app.Run();
