import AdminPanel from '../AdminPanel';
import StatsCard from './StatsCard';
import Chart from './Chart';

const AdminDashboard = () => {

    return (
        <div className="flex h-[1000px]">
            <div className="h-screen w-1/4">
                <AdminPanel/>
            </div>
            <div className="p-6 bg-gray-100 min-h-screen">   
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>       
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <StatsCard title="Số lượng tour" value="12" icon="🗺️" />
                    <StatsCard title="Tổng khách hàng" value="345" icon="👤" />
                    <StatsCard title="Tổng lượt đặt vé" value="2345" icon="📅" />
                    <StatsCard title="Doanh thu" value="$123,456" icon="💵" />
                </div>
                <Chart />
            </div>  
        </div>
    )
}

export default AdminDashboard