import { GlassCard, AnimatedStats } from '../ui/premium';
import { useTheme } from '../../theme/ThemeEngine';

export default function StatCard({ title, value, icon }) {
  const { themeConfig } = useTheme();

  return (
    <GlassCard className="hover:scale-105 transition-transform">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm text-gray-500">{title}</h3>
          <AnimatedStats
            value={value}
            className="text-2xl font-bold"
          />
        </div>
        <div className={`p-3 rounded-full bg-primary-100 text-primary-600`}>
          {icon}
        </div>
      </div>
    </GlassCard>
  );
}