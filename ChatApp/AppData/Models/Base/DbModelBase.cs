using System.ComponentModel.DataAnnotations;

namespace ChatApp.AppData.Models.Base
{
    public abstract class DbModelBase
    {
        [Key]
        public int Id { get; set; }
    }
}