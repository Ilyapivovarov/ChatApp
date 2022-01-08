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
                cfg.CreateMap<Chat, ChatDto>()
                    .ForMember(dest => dest.Admins,
                        opt => opt.MapFrom(src => src.IdAdmins))
                    .ForMember(dest => dest.Members,
                        opt => opt.MapFrom(src => src.IdMembers))
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

        public IEnumerable<TValue> Map<TSource, TValue>(IEnumerable<TSource> value)
        {
            return _mapper.Map<IEnumerable<TSource>, IEnumerable<TValue>>(value);
        }
    }
}