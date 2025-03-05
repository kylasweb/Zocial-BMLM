import { useFieldArray, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

export function SectionForm({ section }) {
  const { register, control, watch } = useForm({
    defaultValues: { content: section.content }
  });

  const { fields } = useFieldArray({
    control,
    name: "content.items"
  });

  return (
    <div className="space-y-4">
      {Object.entries(section.content).map(([key, value]) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          {Array.isArray(value) ? (
            <div className="space-y-2">
              {fields.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <input
                    {...register(`content.items.${index}.title`)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <textarea
                    {...register(`content.items.${index}.description`)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <input
              {...register(`content.${key}`)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          )}
        </div>
      ))}
    </div>
  );
}