using System;
using Microsoft.Extensions.Logging;

namespace ChatApp.ChatAppServices.Logger
{
    public class DefaultLogger : ILogger
    {
        IDisposable ILogger.BeginScope<TState>(TState state)
        {
            return state == null ? new ScopeTrace("Undefined state") 
                : new ScopeTrace(state.ToString());
        }

        bool ILogger.IsEnabled(LogLevel logLevel)
        {
            return true;
        }

        void ILogger.Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception, string> formatter)
        {
            if (exception != null) 
                Console.WriteLine($"{DateTime.Now} {logLevel} {formatter(state, exception)}");
            
            Console.WriteLine($"{DateTime.Now} {logLevel} ");
        }
    }

    public class ScopeTrace : IDisposable
    {
        private readonly string? _state;

        public ScopeTrace(string? state)
        {
            _state = state;
            Services.Logger.LogTrace($"Entry in {_state}");
        }

        public void Dispose()
        {
            Services.Logger.LogTrace($"Left from {_state}");
        }
    }
}