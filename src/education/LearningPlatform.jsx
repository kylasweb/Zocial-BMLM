import { useLearning } from '../hooks/useLearning';
import { useProgress } from '../hooks/useProgress';

export default function LearningPlatform() {
  const { courses, enrollUser, trackProgress } = useLearning();
  const { userProgress, updateProgress } = useProgress();

  return (
    <div className="learning-platform">
      <CourseLibrary
        categories={[
          'Crypto Basics',
          'Trading Strategies',
          'Network Marketing',
          'Leadership Skills'
        ]}
        features={{
          search: true,
          filter: true,
          recommendations: true
        }}
      />
      <ContentDelivery
        formats={[
          'video',
          'interactive',
          'document',
          'quiz'
        ]}
        adaptiveLearning={true}
      />
      <AssessmentSystem
        types={[
          'quizzes',
          'assignments',
          'practical-tasks',
          'peer-reviews'
        ]}
      />
      <CertificationModule
        features={{
          blockchain: true,
          verification: true,
          sharing: true
        }}
      />
      <ProgressTracking
        metrics={[
          'completion-rate',
          'assessment-scores',
          'engagement-level',
          'certification-status'
        ]}
      />
    </div>
  );
}