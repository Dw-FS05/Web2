import { useTaskStore } from '../../store/taskStore';
import { FILTERS, CATEGORIES } from '../../utils/constants';

export default function TaskFilters() {
    const { currentFilter, currentCategory, setFilter, setCategory, searchQuery, setSearchQuery } = useTaskStore();

    return (
        <div className="card mb-6">
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Buscar Tareas</label>
                <input
                    type="text"
                    className="input-field"
                    placeholder="Escribe el título o descripción..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por estado</label>
                    <div className="flex flex-wrap gap-2">
                        {FILTERS.map((f) => (
                            <button
                                key={f.id}
                                onClick={() => setFilter(f.id)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentFilter === f.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                    <select value={currentCategory} onChange={(e) => setCategory(e.target.value)} className="input-field">
                        <option value="all">Todas las categorías</option>
                        {CATEGORIES.map((c) => (<option key={c.id} value={c.id}>{c.label}</option>))}
                    </select>
                </div>
            </div>
        </div>
    );
}