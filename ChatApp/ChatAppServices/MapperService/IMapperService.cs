using System.Collections;
using System.Collections.Generic;

namespace ChatApp.ChatAppServices.MapperService
{
    public interface IMapperService
    {
        public TValue Map<TSource, TValue>(TSource value);

        IEnumerable<TValue> Map<TValue>(IEnumerable value);
    }
}