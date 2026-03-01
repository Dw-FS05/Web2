import { format, formatDistanceToNow, isPast, isToday, isTomorrow } from 'date-fns';
import { es } from 'date-fns/locale';

export const getDueDateLabel = (dueDate) => {
    if (!dueDate) return null;
    if (isToday(dueDate)) return 'Hoy';
    if (isTomorrow(dueDate)) return 'Mañana';
    if (isPast(dueDate)) return 'Vencida';
    return format(dueDate, 'dd/MM/yyyy', { locale: es });
};

export const isOverdue = (dueDate, completed) => {
    if (!dueDate || completed) return false;
    return isPast(dueDate) && !isToday(dueDate);
};