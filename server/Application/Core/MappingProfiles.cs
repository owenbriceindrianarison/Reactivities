using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(
                    d => d.HostUsername, opt => opt.MapFrom(
                        source => source.Attendees
                            .FirstOrDefault(x => x.IsHost).AppUser.UserName
                    )
                );
            CreateMap<ActivityAttendee, Profiles.Profile>()
                .ForMember(
                    d => d.DisplayName, opt => opt.MapFrom(
                            source => source.AppUser.DisplayName
                        )
                )
                .ForMember(
                    d => d.Username, opt => opt.MapFrom(
                            source => source.AppUser.UserName
                        )
                )
                .ForMember(
                    d => d.Bio, opt => opt.MapFrom(
                            source => source.AppUser.Bio
                        )
                );
        }
    }
}