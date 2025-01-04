import React, { useState } from "react";
import AdminPanel from '../AdminPanel';
import AdminDestinateForm from "./AdminDestinateForm";
import AdminDestinateList from "./AdminDestinateList";

const AdminManageDestinates = () => {
    const [tours, setTours] = useState([]);
    const [tourToEdit, setTourToEdit] = useState(null);

    const addOrUpdateTour = (tour) => {
        if (tourToEdit) {
            setTours(
                tours.map((t) => (t.id === tourToEdit.id ? { ...t, ...tour } : t))
            );
        } else {
            setTours([
                ...tours,
                { ...tour, id: Math.random().toString(36).substr(2, 9) },
            ]);
        }
        setTourToEdit(null);
    };

    const deleteTour = (id) => {
        setTours(tours.filter((tour) => tour.id !== id));
    };

    const editTour = (tour) => {
        setTourToEdit(tour);
    };

    return (
        <div className="flex min-h-screen">
            <div className="h-auto w-1/4">
                <AdminPanel />
            </div>

            <div className="w-3/4 flex-1 p-6">

                <AdminDestinateForm
                    onSubmit={addOrUpdateTour}
                    tourToEdit={tourToEdit}
                    clearEdit={() => setTourToEdit(null)}
                />

                <AdminDestinateList 
                    tours={tours} 
                    onEdit={editTour} 
                    onDelete={deleteTour} 
                />
            </div>
        </div>
    );
};

export default AdminManageDestinates;
