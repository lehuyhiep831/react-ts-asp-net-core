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
        void Edit(int id, EditUser model);
        void Remove(int id);
    }
    public class UserService : IUserService
    { 
        private DataContext _context;
        private readonly IMapper _mapper;

        public UserService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public User? Add(AddUser model)
        {
            // map model to new user object
            var user = _mapper.Map<User>(model);

            // save user
           var newUser =  _context.Users.Add(user);
            _context.SaveChanges();

            return newUser.Entity;
        }

        public void Edit(int id, EditUser model)
        {
            var user = getUser(id);

            // copy model to user and save
            _mapper.Map(model, user);
            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(int id)
        {
            return getUser(id);
        }

        public void Remove(int id)
        {
            var user = getUser(id);
            _context.Users.Remove(user);
            _context.SaveChanges();
        }


        // helper methods

        private User getUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null) throw new KeyNotFoundException("User not found");
            return user;
        }
    }
}
