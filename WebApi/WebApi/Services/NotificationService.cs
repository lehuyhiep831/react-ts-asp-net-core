using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Hubs;
using WebApi.Models;

namespace WebApi.Services
{

    public interface IService<T> {
        Task SendNotification(AddNotification model);
        Task<IEnumerable<T>> GetAll();
    }
    public interface INotificationService: IService<Notification>
    {
        
    }
    public class NotificationService(
        DataContext context,
        IMapper mapper,
        IHubContext<NotificationHub> notificationHub) : INotificationService
    {
        public async Task< IEnumerable<Notification>> GetAll()
        {
            var notifications = await context.Notifications.ToListAsync();
            return notifications; 
        }

        public async Task SendNotification(AddNotification model)
        {

            var notification = mapper.Map<Notification>(model);
            //await context.Notifications.AddAsync(notification);
            //await context.SaveChangesAsync();
            await notificationHub.Clients.All.SendAsync("NewNotification", notification);
        }
    }
}
