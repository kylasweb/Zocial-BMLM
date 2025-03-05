import { SectionForm } from './SectionForm';
import { EmptyState } from './EmptyState';

export default function EditorPanel({ activeSection }) {
  if (!activeSection) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium">{activeSection.title}</h3>
      <SectionForm section={activeSection} />
    </div>
  );
}