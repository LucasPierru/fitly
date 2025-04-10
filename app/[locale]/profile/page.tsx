import { getProfile } from '@/requests/profile';
import { BMRCalculator } from './bmrCalculator/bmrCalculator';
import { UserSettings } from './userSettings/userSettings';
import { WeightTracker } from './weightTracker/weightTracker';
import { User } from '@/types-old/users';

export default async function ProfilePage() {
  const { profile } = await getProfile();
  return (
    <div className="space-y-6 gap-6 min-h-screen px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <h1 className="text-xl font-bold text-foreground">Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserSettings profile={profile as User} />
        <BMRCalculator
          weight={profile.weight}
          height={profile.height}
          birthday={profile.birthday}
          sex={profile.sex}
          howActive={profile.howActive}
        />
      </div>
      <WeightTracker />
    </div>
  );
}
