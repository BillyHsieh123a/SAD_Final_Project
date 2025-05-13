import { useState } from 'react';
import { User, Plus, ChevronLeft, Menu, Check, X, Info } from 'lucide-react';

// 模擬數據
const initialWorkouts = [
  { id: 1, name: '慢跑', duration: '30分鐘', completed: false, target: '3次/週' },
  { id: 2, name: '深蹲', duration: '20分鐘', completed: true, target: '2次/週' },
  { id: 3, name: '伏地挺身', duration: '15分鐘', completed: false, target: '4次/週' }
];

const workoutOptions = [
  { id: 1, name: '慢跑', category: '有氧運動' },
  { id: 2, name: '深蹲', category: '肌力訓練' },
  { id: 3, name: '伏地挺身', category: '肌力訓練' },
  { id: 4, name: '仰臥起坐', category: '核心訓練' },
  { id: 5, name: '跳繩', category: '有氧運動' },
  { id: 6, name: '引體向上', category: '肌力訓練' },
  { id: 7, name: '平板支撐', category: '核心訓練' },
  { id: 8, name: '瑜伽', category: '柔軟度' },
  { id: 9, name: '游泳', category: '有氧運動' }
];

const friends = [
  { id: 1, name: '小明', avatar: '👦', workouts: [
    { id: 1, name: '游泳', duration: '45分鐘', completed: true, target: '2次/週' },
    { id: 2, name: '重訓', duration: '60分鐘', completed: false, target: '3次/週' }
  ]},
  { id: 2, name: '小華', avatar: '👧', workouts: [
    { id: 1, name: '跑步', duration: '40分鐘', completed: false, target: '5次/週' },
    { id: 2, name: '瑜伽', duration: '30分鐘', completed: true, target: '3次/週' }
  ]},
  { id: 3, name: '阿強', avatar: '👨', workouts: [
    { id: 1, name: '健走', duration: '30分鐘', completed: true, target: '每天' },
    { id: 2, name: '拉伸', duration: '15分鐘', completed: true, target: '每天' }
  ]}
];

export default function FitnessBuddyApp() {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [page, setPage] = useState('home'); // 'home', 'add', 'friends', 'friendDetail'
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [workoutDuration, setWorkoutDuration] = useState('30分鐘');
  const [workoutTarget, setWorkoutTarget] = useState('3次/週');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'cardio', 'strength', 'core', 'flexibility'
  
  // 過濾健身選項
  const filteredWorkouts = workoutOptions.filter(workout => {
    const matchesSearch = workout.name.includes(searchTerm);
    if (activeTab === 'all') return matchesSearch;
    const categoryMap = {
      'cardio': '有氧運動',
      'strength': '肌力訓練',
      'core': '核心訓練',
      'flexibility': '柔軟度'
    };
    return matchesSearch && workout.category === categoryMap[activeTab];
  });
  
  // 添加新的健身計劃
  const addWorkout = () => {
    if (!selectedWorkout) return;
    
    const newWorkout = {
      id: workouts.length + 1,
      name: selectedWorkout.name,
      duration: workoutDuration,
      target: workoutTarget,
      completed: false
    };
    
    setWorkouts([...workouts, newWorkout]);
    setPage('home');
    setSelectedWorkout(null);
  };
  
  // 切換任務完成狀態
  const toggleComplete = (id) => {
    setWorkouts(workouts.map(workout => 
      workout.id === id ? {...workout, completed: !workout.completed} : workout
    ));
  };
  
  // 選擇朋友查看詳情
  const viewFriendDetail = (friend) => {
    setSelectedFriend(friend);
    setPage('friendDetail');
    setMenuOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 頂部導航欄 */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        {page !== 'home' ? (
          <button 
            onClick={() => {
              if (page === 'friendDetail') {
                setPage('friends');
              } else {
                setPage('home');
              }
              setSelectedWorkout(null);
            }}
            className="text-white"
          >
            <ChevronLeft size={24} />
          </button>
        ) : (
          <h1 className="text-xl font-bold">健身夥伴</h1>
        )}
        
        {page === 'add' && <span className="text-xl font-bold">新增健身計劃</span>}
        {page === 'friends' && <span className="text-xl font-bold">好友列表</span>}
        {page === 'friendDetail' && selectedFriend && (
          <span className="text-xl font-bold">{selectedFriend.name} 的計劃</span>
        )}
        
        <button 
          onClick={() => {
            if (page === 'friends' || page === 'friendDetail') {
              setPage('home');
            } else {
              setMenuOpen(!menuOpen);
            }
          }}
          className="text-white"
        >
          <Menu size={24} />
        </button>
      </header>
      
      {/* 下拉選單 */}
      {menuOpen && (
        <div className="absolute right-0 top-16 bg-white shadow-lg rounded-bl-lg z-10 w-48">
          <div 
            className="p-4 hover:bg-gray-100 cursor-pointer flex items-center"
            onClick={() => {
              setPage('friends');
              setMenuOpen(false);
            }}
          >
            <User size={18} className="mr-2" />
            <span>好友列表</span>
          </div>
        </div>
      )}
      
      {/* 主頁面 - 健身計劃列表 */}
      {page === 'home' && (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">我的健身計劃</h2>
          
          {workouts.length === 0 ? (
            <div className="bg-white rounded-lg p-6 shadow-sm text-center">
              <p className="text-gray-500">您還沒有健身計劃</p>
              <p className="text-gray-500 mb-4">點擊下方按鈕添加</p>
              <Info size={48} className="mx-auto text-blue-500" />
            </div>
          ) : (
            <div className="space-y-3">
              {workouts.map(workout => (
                <div 
                  key={workout.id} 
                  className="bg-white rounded-lg p-4 shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{workout.name}</h3>
                    <p className="text-sm text-gray-600">時間: {workout.duration}</p>
                    <p className="text-sm text-gray-600">目標: {workout.target}</p>
                  </div>
                  <button 
                    onClick={() => toggleComplete(workout.id)}
                    className={`rounded-full p-2 ${workout.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                  >
                    {workout.completed ? <Check size={20} /> : <X size={20} />}
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* 新增按鈕 */}
          <div className="fixed bottom-6 right-6">
            <button 
              onClick={() => setPage('add')}
              className="bg-blue-600 text-white rounded-full p-4 shadow-lg"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>
      )}
      
      {/* 添加健身計劃頁面 */}
      {page === 'add' && (
        <div className="p-4">
          {/* 搜索欄 */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="搜索健身項目..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300"
            />
          </div>
          
          {/* 分類標籤 */}
          <div className="flex overflow-x-auto mb-4 pb-2">
            <button 
              onClick={() => setActiveTab('all')} 
              className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              全部
            </button>
            <button 
              onClick={() => setActiveTab('cardio')} 
              className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${activeTab === 'cardio' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              有氧運動
            </button>
            <button 
              onClick={() => setActiveTab('strength')} 
              className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${activeTab === 'strength' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              肌力訓練
            </button>
            <button 
              onClick={() => setActiveTab('core')} 
              className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${activeTab === 'core' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              核心訓練
            </button>
            <button 
              onClick={() => setActiveTab('flexibility')} 
              className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${activeTab === 'flexibility' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              柔軟度
            </button>
          </div>
          
          {/* 健身項目列表 */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">選擇健身項目</h3>
            <div className="grid grid-cols-2 gap-3">
              {filteredWorkouts.map(workout => (
                <div 
                  key={workout.id}
                  onClick={() => setSelectedWorkout(workout)}
                  className={`p-3 rounded-lg border-2 cursor-pointer ${selectedWorkout?.id === workout.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}
                >
                  <h4 className="font-semibold">{workout.name}</h4>
                  <p className="text-sm text-gray-600">{workout.category}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* 時間和目標設置 */}
          {selectedWorkout && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">運動時間</label>
                <select 
                  value={workoutDuration}
                  onChange={(e) => setWorkoutDuration(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300"
                >
                  <option value="15分鐘">15分鐘</option>
                  <option value="20分鐘">20分鐘</option>
                  <option value="30分鐘">30分鐘</option>
                  <option value="45分鐘">45分鐘</option>
                  <option value="60分鐘">60分鐘</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">每週目標</label>
                <select 
                  value={workoutTarget}
                  onChange={(e) => setWorkoutTarget(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300"
                >
                  <option value="1次/週">1次/週</option>
                  <option value="2次/週">2次/週</option>
                  <option value="3次/週">3次/週</option>
                  <option value="4次/週">4次/週</option>
                  <option value="5次/週">5次/週</option>
                  <option value="每天">每天</option>
                </select>
              </div>
            </>
          )}
          
          {/* 添加按鈕 */}
          <button 
            onClick={addWorkout}
            disabled={!selectedWorkout}
            className={`w-full py-3 rounded-lg ${selectedWorkout ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}`}
          >
            添加到我的計劃
          </button>
        </div>
      )}
      
      {/* 好友列表頁面 */}
      {page === 'friends' && (
        <div className="p-4">
          <div className="space-y-3">
            {friends.map(friend => (
              <div 
                key={friend.id}
                onClick={() => viewFriendDetail(friend)}
                className="bg-white rounded-lg p-4 shadow-sm flex items-center cursor-pointer"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl mr-4">
                  {friend.avatar}
                </div>
                <div>
                  <h3 className="font-semibold">{friend.name}</h3>
                  <p className="text-sm text-gray-600">{friend.workouts.length} 個健身計劃</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* 好友詳情頁面 */}
      {page === 'friendDetail' && selectedFriend && (
        <div className="p-4">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mr-4">
              {selectedFriend.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold">{selectedFriend.name}</h2>
              <p className="text-gray-600">{selectedFriend.workouts.length} 個健身計劃</p>
            </div>
          </div>
          
          <h3 className="text-lg font-bold mb-3">健身計劃</h3>
          <div className="space-y-3">
            {selectedFriend.workouts.map(workout => (
              <div 
                key={workout.id}
                className="bg-white rounded-lg p-4 shadow-sm"
              >
                <h4 className="font-semibold">{workout.name}</h4>
                <p className="text-sm text-gray-600">時間: {workout.duration}</p>
                <p className="text-sm text-gray-600">目標: {workout.target}</p>
                <div className="mt-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${workout.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                    {workout.completed ? '已完成' : '進行中'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}