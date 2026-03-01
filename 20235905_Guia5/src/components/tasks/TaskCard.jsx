import { Link } from 'react-router-dom';
import { updateTask, deleteTask } from '../../services/taskService';
import { CATEGORIES } from '../../utils/constants';
import { getDueDateLabel, isOverdue } from '../../utils/dateHelpers';

export default function TaskCard({ task }) {
    const category = CATEGORIES.find(c => c.id === task.category);
    const overdue = isOverdue(task.dueDate, task.completed);

    const handleToggle = async (e) => {
        e.preventDefault();
        await updateTask(task.id, { completed: !task.completed });
    };

    return (
        <Link to={`/tasks/${task.id}`} className="block">
            <div className={`card hover:shadow-lg transition-shadow border-l-4 ${overdue ? 'border-red-500' : 'border-blue-500'} ${task.completed ? 'opacity-60' : ''}`}>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className={`font-bold text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                            {task.title}
                        </h3>
                        <div className="flex gap-2 mt-2">
                            <span className={`px-2 py-0.5 rounded text-xs bg-${category?.color}-100 text-${category?.color}-800`}>
                                {category?.label}
                            </span>
                            {task.dueDate && (
                                <span className={`text-xs font-medium ${overdue ? 'text-red-600' : 'text-gray-500'}`}>
                                    📅 {getDueDateLabel(task.dueDate)}
                                </span>
                            )}
                        </div>
                    </div>
                    <button onClick={handleToggle} className="btn-secondary text-xs">
                        {task.completed ? '↩️ Reabrir' : '✅ Completar'}
                    </button>
                </div>
            </div>
        </Link>
    );
}