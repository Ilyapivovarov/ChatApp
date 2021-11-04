using System;
using Microsoft.Extensions.Logging;

namespace ChatApp.ChatAppServices.Logger
{
    public class DefaultLogger : ILogger
    {
        public IDisposable BeginScope<TState>(TState state)
        {
            return new ScopeTrace(state.ToString());
        }

        public bool IsEnabled(LogLevel logLevel)
        {
            return true;
        }

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            Console.WriteLine($"{DateTime.Now} {logLevel} {formatter(state, exception)}");
        }
    }

    public class ScopeTrace : IDisposable
    {
        private readonly string _state;

        public ScopeTrace(string state)
        {
            _state = state;
            Services.Logger.LogTrace($"Entered in {_state}");
        }
        
        public void Dispose()
        {
            Services.Logger.LogTrace($"Left from method {_state}");
        }
    }
}