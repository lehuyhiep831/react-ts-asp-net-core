namespace WebApi.Entities
{
    public class Notification
    {
        public string Id { get; set; }

        public string Content { get; set; } = "";

        public int TargetId { get; set; }
    }
}
