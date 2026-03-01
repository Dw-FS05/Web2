import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../store/authStore';
import { createTask } from '../../services/taskService';
import { CATEGORIES, PRIORITIES } from '../../utils/constants';
import { toast } from 'react-hot-toast';

export default function TaskForm({ onClose }) {
    const user = useAuthStore((state) => state.user);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);

        const taskData = {
            title: data.title,
            description: data.description,
            category: data.category,
            priority: data.priority,
            dueDate: data.dueDate ? new Date(data.dueDate) : null
        };

        const result = await createTask(user.uid, taskData);

        if (result.success) {
            toast.success('¡Tarea creada con éxito!'); 
            onClose(); 
        } else {
            toast.error('Hubo un error al crear la tarea'); 
        }

        setLoading(false);
    };

    return (
        <div className="card border-2 border-blue-100 p-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Nueva Tarea</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <input
                        {...register('title', { required: 'El título es obligatorio' })}
                        placeholder="Título de la tarea"
                        className="input-field"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                </div>

                <textarea
                    {...register('description')}
                    placeholder="Descripción (opcional)"
                    className="input-field"
                    rows="3"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select {...register('category')} className="input-field">
                        {CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                        ))}
                    </select>

                    <select {...register('priority')} className="input-field">
                        {PRIORITIES.map(prio => (
                            <option key={prio.id} value={prio.id}>{prio.label}</option>
                        ))}
                    </select>

                    <input type="date" {...register('dueDate')} className="input-field" />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={onClose} className="btn-secondary">
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary disabled:opacity-50"
                    >
                        {loading ? 'Guardando...' : 'Crear Tarea'}
                    </button>
                </div>
            </form>
        </div>
    );
}