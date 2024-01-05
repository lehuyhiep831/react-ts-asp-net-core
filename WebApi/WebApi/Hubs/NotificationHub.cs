using Microsoft.AspNetCore.SignalR;
using WebApi.Entities;
using WebApi.Models;
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
           
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            // Do something before disconnect

            await base.OnDisconnectedAsync(exception);
        }

        
        public async Task SendNotification(AddNotification notification)
        {
            // Publish new notification to all connections 
            await Clients.Others.SendAsync("NewNotification", notification);
        }

         
    }
}
