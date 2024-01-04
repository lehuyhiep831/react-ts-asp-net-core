using AutoMapper;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models;

namespace WebApi.Services
{
    public interface IUserService
    {
        IEnumerable<User> GetAll();
        User GetById(int id);
        User? Add(AddUser model);
        Task<User> AddAsync(AddUser model);
        void Edit(int id, EditUser model);
        void Remove(int id);
    }
    public class UserService(
        DataContext context,
        IMapper mapper,
         INotificationService notificationService) : IUserService
    {
        public User? Add(AddUser model)
        {
            // map model to new user object
            var user = mapper.Map<User>(model);

            // save user
           var newUser =  context.Users.Add(user);
            context.SaveChanges();

            return newUser.Entity;
        }

        public void Edit(int id, EditUser model)
        {
            var user = getUser(id);

            // copy model to user and save
            mapper.Map(model, user);
            context.Users.Update(user);
            context.SaveChanges();
        }

        public IEnumerable<User> GetAll()
        {
            return context.Users;
        }

        public User GetById(int id)
        {
            return getUser(id);
        }

        public void Remove(int id)
        {
            var user = getUser(id);
            context.Users.Remove(user);
            context.SaveChanges();
        }

        public async Task<User> AddAsync(AddUser model)
        {
           var newUser = mapper.Map<User>(model);

            await context.AddAsync(newUser);
            await context.SaveChangesAsync();

            Thread.Sleep(5000);

            AddNotification notification = new()
            {
                Content = "New User Create Successfully",
                TargetId = newUser.Id
            };

            await notificationService.SendNotification(notification);

            return newUser;
        }


        // helper methods

        private User getUser(int id)
        {
            var user = context.Users.Find(id);
            if (user == null) throw new KeyNotFoundException("User not found");
            return user;
        }

       
    }
}
