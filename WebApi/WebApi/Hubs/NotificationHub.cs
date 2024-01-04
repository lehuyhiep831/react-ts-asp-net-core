using Microsoft.AspNetCore.SignalR;
using WebApi.Entities;
using WebApi.Services;

namespace WebApi.Hubs
{
    public class NotificationHub:Hub
    {

        private readonly INotificationService _notificationService;
        public NotificationHub(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        // Handle when a new connection is establish or terminated
        public override async Task OnConnectedAsync()
        {
            // Get notification history on connected 
           // var notifications = await _notificationService.GetAll();
            //await Clients.Caller.SendAsync("NotificationsHistory", notifications);
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            // Do something before disconnect

            await base.OnDisconnectedAsync(exception);
        }

        
        public async Task SendNotification(Notification notification)
        {
            // Publish new notification to all connections 
            await Clients.All.SendAsync("NewNotification", notification);
        }
    }
}
