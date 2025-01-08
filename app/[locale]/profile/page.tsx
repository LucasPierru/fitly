import { BMRCalculator } from './bmrCalculator/bmrCalculator';
import { UserSettings } from './userSettings/userSettings';
import { WeightTracker } from './weightTracker/weightTracker';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserSettings />
        <BMRCalculator />
      </div>

      <WeightTracker />
    </div>
  );
}
