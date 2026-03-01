import { useTaskStore } from '../../store/taskStore';
import { isOverdue } from '../../utils/dateHelpers';

export default function TaskStats() {
    const { tasks } = useTaskStore();

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.filter(t => !t.completed).length;
    const overdue = tasks.filter(t => isOverdue(t.dueDate, t.completed)).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="card p-4 text-center">
                <p className="text-gray-500 text-xs uppercase font-bold">Total</p>
                <p className="text-2xl font-black">{total}</p>
            </div>
            <div className="card p-4 text-center border-b-4 border-green-500">
                <p className="text-gray-500 text-xs uppercase font-bold">Listas</p>
                <p className="text-2xl font-black text-green-600">{completed}</p>
            </div>
            <div className="card p-4 text-center border-b-4 border-yellow-500">
                <p className="text-gray-500 text-xs uppercase font-bold">Pendientes</p>
                <p className="text-2xl font-black text-yellow-600">{pending}</p>
            </div>
            <div className="card p-4 text-center border-b-4 border-red-500">
                <p className="text-gray-500 text-xs uppercase font-bold">Vencidas</p>
                <p className="text-2xl font-black text-red-600">{overdue}</p>
            </div>
            <div className="card p-4 text-center bg-blue-600 text-white">
                <p className="text-blue-100 text-xs uppercase font-bold">Progreso</p>
                <p className="text-2xl font-black">{progress}%</p>
            </div>
        </div>
    );
}