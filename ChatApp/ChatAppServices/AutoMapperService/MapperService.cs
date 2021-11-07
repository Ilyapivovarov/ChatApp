using AutoMapper;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;

namespace ChatApp.ChatAppServices.AutoMapperService
{
    public class MapperService : IMapperService
    {
        private readonly Mapper _mapper;

        public MapperService()
        {
            var config = new MapperConfiguration(cfg => cfg.CreateMap<User, Account>());
            _mapper = new Mapper(config);
        }
        
        public TValue Map<TSource, TValue>(TSource value)
        {
            return _mapper.Map<TSource, TValue>(value);
        }
    }
}