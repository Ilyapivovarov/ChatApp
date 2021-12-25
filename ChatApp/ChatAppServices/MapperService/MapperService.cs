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
                cfg.CreateMap<User, UserDto>();
                cfg.CreateMap<Chat, RoomDto>()
                    .ForMember(dest => dest.AdAdminmin,
                        opt => opt.MapFrom(src => src.Admin))
                    .ForMember(dest => dest.Members,
                        opt => opt.MapFrom(src => src.Members))
                    .ForMember(dst => dst.Messages,
                        opt => opt.MapFrom(src => src.Messages));
                cfg.CreateMap<Message, MessageDto>()
                    .ForMember(dest => dest.Body,
                        opt => opt.MapFrom(src => src.Body));
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