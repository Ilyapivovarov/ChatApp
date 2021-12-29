using System.Collections;
using System.Collections.Generic;
using ChatApp.AppData.Models;

namespace ChatApp.AppData.ModelBuilders.Interfaces;

public interface IChatBuilder
{
    public IChatBuilder Reset();
    public IChatBuilder SetCreator(User user);
    
    public IChatBuilder SetName(string name);

    public Chat Build();
}