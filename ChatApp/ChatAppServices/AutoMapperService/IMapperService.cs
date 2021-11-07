namespace ChatApp.ChatAppServices.AutoMapperService
{
    public interface IMapperService
    {
        public TValue Map<TSource, TValue>(TSource value);
    }
}