import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import SecuritySettings from '../SecuritySettings';
import DistributionSettings from '../DistributionSettings';

export default function TokenForm({ initialData, onSubmit }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Token Name</label>
          <input
            {...register('name', { required: 'Token name is required' })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Token Symbol</label>
          <input
            {...register('symbol', { required: 'Token symbol is required' })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.symbol && (
            <span className="text-red-500 text-sm">{errors.symbol.message}</span>
          )}
        </div>
      </div>

      <SecuritySettings register={register} errors={errors} />
      <DistributionSettings register={register} errors={errors} />

      <motion.button
        whileHover={{ scale: 1.02 }}
        type="submit"
        className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg"
      >
        Save Token
      </motion.button>
    </form>
  );
}