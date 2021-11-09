using System.Collections;
using System.Collections.Generic;
using AutoMapper;
using ChatApp.AppData.Dto;
using ChatApp.AppData.Models;

namespace ChatApp.ChatAppServices.MapperService
{
    public class MapperService : IMapperService
    {
        private readonly Mapper _mapper;

        public MapperService()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, Account>();
                cfg.CreateMap<ChatRoom, Room>()
                    .ForMember(dest => dest.Admin,
                        opt => opt.MapFrom(src => src.Admin))
                    .ForMember(dest => dest.Members,
                        opt => opt.MapFrom(src => src.Members))
                    .ForMember(dst => dst.Messages,
                        opt => opt.MapFrom(src => src.Messages));
                cfg.CreateMap<ChatMessage, Message>()
                    .ForMember(dest => dest.Body,
                        opt => opt.MapFrom(src => src.Message));
            });
            _mapper = new Mapper(config);
        }

        public TValue Map<TSource, TValue>(TSource value)
        {
            return _mapper.Map<TSource, TValue>(value);
        }

        public IEnumerable<TValue> Map<TValue>(IEnumerable value)
        {
            return _mapper.Map<IEnumerable, IEnumerable<TValue>>(value);
        }
    }
}