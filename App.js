{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\sl368\sa213\partightenfactor0

\f0\fs32 \cf2 \expnd0\expndtw0\kerning0
import React, \{ useState, useMemo, useEffect, useRef \} from 'react';\
import * as XLSX from 'xlsx'; // Fallback if npm install is used\
import \{ \
  LayoutGrid, \
  List as ListIcon, \
  Search, \
  Plus, \
  Filter, \
  Edit3, \
  Trash2, \
  Package, \
  ChefHat, \
  ShoppingCart, \
  BarChart3, \
  Settings, \
  ChevronDown, \
  ArrowUpDown,\
  Milk,\
  Wheat,\
  Beef,\
  Carrot,\
  Droplet,\
  Upload,\
  X,\
  Save,\
  FileText,\
  Check,\
  Info,\
  DollarSign,\
  Activity,\
  AlertTriangle,\
  Leaf,\
  Truck,\
  Camera,\
  CornerDownRight,\
  ArrowLeft,\
  MapPin,\
  Box,\
  AlertCircle,\
  PieChart,\
  TrendingUp,\
  Tags,\
  Users,\
  LogOut,\
  Key,\
  User,\
  Shield,\
  Eye,\
  EyeOff\
\} from 'lucide-react';\
\
// --- Constants ---\
\
const ALLERGEN_LIST = [\
  'Gluten', 'Crustacean', 'Egg', 'Fish', 'Peanuts', 'Soybeans', \
  'Walnuts & Tree Nuts', 'Milk', 'Sulphite', 'Celery', 'Mustard', \
  'Sesame', 'Shellfish', 'Lupin', 'Yeast', 'Mollusca', 'Monosodium Glutamate', \
  'Cereal', 'Coconut'\
];\
\
const DIET_LIST = [\
  'Keto', 'Paleo', 'Vegan', 'Vegetarian', 'Gluten Free'\
];\
\
// --- Mock Data ---\
\
const INITIAL_USERS = [\
  \{ id: 1, username: 'admin', password: '123', role: 'Administrator', name: 'John Doe' \},\
  \{ id: 2, username: 'chef', password: '123', role: 'Contributor', name: 'Chef Mike' \},\
  \{ id: 3, username: 'view', password: '123', role: 'Viewer', name: 'Guest User' \},\
];\
\
const INITIAL_INGREDIENTS = [\
  \{ \
    id: 1, \
    articleCode: '1080023', \
    name: 'Premium All-Purpose Flour', \
    category: 'Dry Goods', \
    cost: 0.450, \
    baseQty: 1000, \
    baseUnit: 'kg', \
    storeUnit: 'Bag / 50 KG',\
    brand: 'Kuwait Flour Mills', \
    origin: 'Kuwait', \
    supplier: 'Al Eman Al Fidiyi Co',\
    stock: 150,\
    status: 'In Stock',\
    imageType: 'wheat',\
    images: [], \
    nutrition: \{ calories: 364, carbs: 76, fiber: 2.7, sugar: 0.3, protein: 10, fat: 1, satFat: 0.2, transFat: 0, cholesterol: 0, sodium: 2 \},\
    allergens: \{ 'Gluten': true, 'Cereal': true \},\
    diet: \{ 'Vegan': true, 'Vegetarian': true \}\
  \},\
  \{ \
    id: 2, \
    articleCode: '1030009', \
    name: 'Full Cream Milk', \
    category: 'Dairy', \
    cost: 0.380, \
    baseQty: 1000, \
    baseUnit: 'L', \
    storeUnit: 'Carton / 12 x 1L',\
    brand: 'KDD', \
    origin: 'Kuwait', \
    supplier: 'Petra Food Services',\
    stock: 45,\
    status: 'Low Stock',\
    imageType: 'milk',\
    images: [],\
    nutrition: \{ calories: 61, carbs: 4.8, fiber: 0, sugar: 4.8, protein: 3.2, fat: 3.3, satFat: 2.1, transFat: 0, cholesterol: 10, sodium: 50 \},\
    allergens: \{ 'Milk': true \},\
    diet: \{ 'Vegetarian': true, 'Gluten Free': true \}\
  \},\
  \{ \
    id: 3, \
    articleCode: '1200042', \
    name: 'Australian Wagyu Beef (Ribeye)', \
    category: 'Meat', \
    cost: 18.500, \
    baseQty: 1000,\
    baseUnit: 'kg', \
    storeUnit: 'Piece / ~4kg',\
    brand: 'Rangers Valley', \
    origin: 'Australia', \
    supplier: 'Prime Cuts Co.',\
    stock: 12,\
    status: 'In Stock',\
    imageType: 'beef',\
    images: [],\
    nutrition: \{ calories: 250, carbs: 0, fiber: 0, sugar: 0, protein: 26, fat: 15, satFat: 6, transFat: 0.5, cholesterol: 70, sodium: 60 \},\
    allergens: \{\},\
    diet: \{ 'Keto': true, 'Paleo': true, 'Gluten Free': true \}\
  \},\
];\
\
const INITIAL_RECIPES = [\
  \{ \
    id: 101, \
    articleCode: 'R-001', \
    name: 'Wagyu Beef Burger', \
    category: 'Hot Kitchen', \
    brand: 'Main Course', \
    origin: '45 mins', \
    supplier: '180\'b0C', \
    stock: 20,\
    status: 'In Stock',\
    imageType: 'beef',\
    images: [], \
    recipeIngredients: [\
        \{ id: 3, name: 'Australian Wagyu Beef (Ribeye)', articleCode: '1200042', qty: 150, unit: 'g', cost: 2.775 \},\
        \{ id: 1, name: 'Premium All-Purpose Flour', articleCode: '1080023', qty: 20, unit: 'g', cost: 0.009 \}\
    ],\
    yieldQty: 160, \
    productInfo: '1. Grind meat. 2. Mix with flour. 3. Grill.',\
    nutrition: \{ calories: 850, carbs: 45, fiber: 4, sugar: 6, protein: 42, fat: 55, satFat: 18, transFat: 1.5, cholesterol: 110, sodium: 950 \},\
    allergens: \{ 'Gluten': true, 'Milk': true, 'Egg': true, 'Mustard': true \},\
    diet: \{ 'Keto': false \}\
  \},\
];\
\
// --- Helper Components ---\
\
const StatusBadge = (\{ status \}) => \{\
  const styles = \{\
    'In Stock': 'bg-green-100 text-green-700 border-green-200',\
    'Low Stock': 'bg-yellow-100 text-yellow-700 border-yellow-200',\
    'Critical': 'bg-red-100 text-red-700 border-red-200',\
  \};\
  return (\
    <span className=\{`px-2.5 py-0.5 rounded-full text-xs font-medium border $\{styles[status] || 'bg-gray-100 text-gray-700'\}`\}>\
      \{status\}\
    </span>\
  );\
\};\
\
const IngredientIcon = (\{ type, size = "md", className = "" \}) => \{\
  const sizeClasses = size === "xl" ? "w-32 h-32" : size === "lg" ? "w-16 h-16" : "w-8 h-8";\
  const styles = `$\{sizeClasses\} text-slate-500 $\{className\}`;\
  switch (type) \{\
    case 'wheat': return <Wheat className=\{styles\} />;\
    case 'milk': return <Milk className=\{styles\} />;\
    case 'beef': return <Beef className=\{styles\} />;\
    case 'carrot': return <Carrot className=\{styles\} />;\
    case 'oil': return <Droplet className=\{styles\} />;\
    default: return <Package className=\{styles\} />;\
  \}\
\};\
\
const formatCurrency = (amount) => \{\
  return new Intl.NumberFormat('en-KW', \{\
    style: 'decimal',\
    minimumFractionDigits: 3,\
    maximumFractionDigits: 3\
  \}).format(amount) + ' KWD';\
\};\
\
const NutritionFactLabel = (\{ nutrition \}) => \{\
  const dv = \{ fat: 65, satFat: 20, cholesterol: 300, sodium: 2400, carbs: 300, fiber: 25, protein: 50 \};\
  const calcDV = (val, key) => Math.round((val / dv[key]) * 100) || 0;\
\
  return (\
    <div className="bg-white border-2 border-black p-4 font-sans text-black w-full shadow-sm select-none">\
      <h3 className="font-black text-3xl border-b-[10px] border-black pb-1 mb-1 leading-none">Nutrition Facts</h3>\
      <div className="flex justify-between items-baseline border-b border-black pb-1">\
        <span className="font-bold text-sm">Serving size</span>\
        <span className="font-bold text-sm">100g</span>\
      </div>\
      <div className="border-b-[5px] border-black py-2 mb-1">\
        <div className="font-bold text-xs">Amount per serving</div>\
        <div className="flex justify-between items-end leading-none mt-1">\
          <span className="font-black text-3xl">Calories</span>\
          <span className="font-black text-4xl">\{nutrition.calories || 0\}</span>\
        </div>\
      </div>\
      <div className="text-xs text-right font-bold border-b border-black pb-1 mb-1">% Daily Value*</div>\
      <div className="text-sm border-b border-slate-300 pb-1 mb-1 flex justify-between">\
        <span><span className="font-bold">Total Fat</span> \{nutrition.fat\}g</span>\
        <span className="font-bold">\{calcDV(nutrition.fat, 'fat')\}%</span>\
      </div>\
      <div className="text-sm border-b border-slate-300 pb-1 mb-1 flex justify-between pl-4">\
        <span>Saturated Fat \{nutrition.satFat\}g</span>\
        <span className="font-bold">\{calcDV(nutrition.satFat, 'satFat')\}%</span>\
      </div>\
      <div className="text-sm border-b border-slate-300 pb-1 mb-1 flex justify-between">\
        <span><span className="font-bold">Cholesterol</span> \{nutrition.cholesterol\}mg</span>\
        <span className="font-bold">\{calcDV(nutrition.cholesterol, 'cholesterol')\}%</span>\
      </div>\
      <div className="text-sm border-b border-slate-300 pb-1 mb-1 flex justify-between">\
        <span><span className="font-bold">Sodium</span> \{nutrition.sodium\}mg</span>\
        <span className="font-bold">\{calcDV(nutrition.sodium, 'sodium')\}%</span>\
      </div>\
      <div className="text-sm border-b border-slate-300 pb-1 mb-1 flex justify-between">\
        <span><span className="font-bold">Total Carbohydrate</span> \{nutrition.carbs\}g</span>\
        <span className="font-bold">\{calcDV(nutrition.carbs, 'carbs')\}%</span>\
      </div>\
      <div className="text-sm border-b-[5px] border-black pb-1 mb-1 flex justify-between">\
        <span><span className="font-bold">Protein</span> \{nutrition.protein\}g</span>\
      </div>\
    </div>\
  );\
\};\
\
// --- Dashboard Component ---\
\
const Dashboard = (\{ ingredients, recipes \}) => \{\
  // 1. Calculations for Top Stats\
  const totalIngredients = ingredients.length;\
  const totalRecipes = recipes.length;\
  const lowStockCount = ingredients.filter(i => i.status === 'Low Stock' || i.status === 'Critical').length;\
  const inventoryValue = ingredients.reduce((acc, i) => acc + (i.cost * i.stock), 0);\
\
  // 2. Data for Bar Graph (Ingredient Counts by Category)\
  const categoryCounts = useMemo(() => \{\
    const counts = \{\};\
    ingredients.forEach(i => \{\
      counts[i.category] = (counts[i.category] || 0) + 1;\
    \});\
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);\
  \}, [ingredients]);\
\
  // 3. Data for Pie Chart (Recipe Counts by Category)\
  const recipeCategoryCounts = useMemo(() => \{\
    const counts = \{\};\
    recipes.forEach(r => \{\
      counts[r.category] = (counts[r.category] || 0) + 1;\
    \});\
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);\
  \}, [recipes]);\
\
  // Pie Chart Color Helper\
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];\
  \
  // Calculate gradients for Conic Pie Chart\
  const pieGradient = useMemo(() => \{\
    let currentDeg = 0;\
    const total = recipes.length || 1;\
    const gradients = recipeCategoryCounts.map(([cat, count], idx) => \{\
      const deg = (count / total) * 360;\
      const color = COLORS[idx % COLORS.length];\
      const segment = `$\{color\} $\{currentDeg\}deg $\{currentDeg + deg\}deg`;\
      currentDeg += deg;\
      return segment;\
    \});\
    return `conic-gradient($\{gradients.join(', ')\})`;\
  \}, [recipeCategoryCounts, recipes]);\
\
  // 4. Top 10 Expensive Raw Materials\
  const topIngredients = useMemo(() => \{\
    return [...ingredients].sort((a, b) => b.cost - a.cost).slice(0, 10);\
  \}, [ingredients]);\
\
  // 5. Top 10 Expensive Recipes (Calculated Cost)\
  const topRecipes = useMemo(() => \{\
    const calcCost = (r) => r.recipeIngredients.reduce((sum, item) => sum + (item.cost || 0), 0);\
    return [...recipes].sort((a, b) => calcCost(b) - calcCost(a)).slice(0, 10);\
  \}, [recipes]);\
\
  // 6. Department Breakdown\
  const deptStats = useMemo(() => \{\
    const stats = \{\};\
    recipes.forEach(r => \{\
      if(!stats[r.category]) stats[r.category] = \{ recipes: 0, ingredients: 0 \};\
      stats[r.category].recipes += 1;\
    \});\
    // Assuming ingredients map to departments via their category for this mock\
    ingredients.forEach(i => \{\
       // Rough mapping or just counting categories\
       if(!stats[i.category]) stats[i.category] = \{ recipes: 0, ingredients: 0 \};\
       stats[i.category].ingredients += 1;\
    \});\
    return stats;\
  \}, [recipes, ingredients]);\
\
  return (\
    <div className="p-6 space-y-6 animate-in fade-in duration-500">\
      <div className="flex items-center justify-between">\
        <h2 className="text-2xl font-bold text-slate-800">Dashboard Overview</h2>\
        <span className="text-sm text-slate-500">Last updated: Just now</span>\
      </div>\
\
      \{/* Top Stats Cards */\}\
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">\
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">\
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><Package className="w-6 h-6" /></div>\
          <div>\
            <p className="text-sm text-slate-500 font-medium">Total Ingredients</p>\
            <p className="text-2xl font-bold text-slate-800">\{totalIngredients\}</p>\
          </div>\
        </div>\
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">\
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><ChefHat className="w-6 h-6" /></div>\
          <div>\
            <p className="text-sm text-slate-500 font-medium">Total Recipes</p>\
            <p className="text-2xl font-bold text-slate-800">\{totalRecipes\}</p>\
          </div>\
        </div>\
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">\
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg"><AlertCircle className="w-6 h-6" /></div>\
          <div>\
            <p className="text-sm text-slate-500 font-medium">Low Stock Alerts</p>\
            <p className="text-2xl font-bold text-slate-800">\{lowStockCount\}</p>\
          </div>\
        </div>\
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">\
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><DollarSign className="w-6 h-6" /></div>\
          <div>\
            <p className="text-sm text-slate-500 font-medium">Inventory Value</p>\
            <p className="text-2xl font-bold text-slate-800">\{formatCurrency(inventoryValue)\}</p>\
          </div>\
        </div>\
      </div>\
\
      \{/* Charts Row */\}\
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">\
        \
        \{/* Bar Graph: Ingredients by Category */\}\
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">\
          <div className="flex items-center justify-between mb-6">\
            <h3 className="font-bold text-slate-800 flex items-center gap-2">\
              <BarChart3 className="w-5 h-5 text-slate-400" />\
              Raw Materials by Category\
            </h3>\
          </div>\
          \{/* Simple CSS Bar Chart */\}\
          <div className="flex items-end gap-2 h-48 pt-4 pb-2 border-b border-slate-100">\
            \{categoryCounts.map(([cat, count], idx) => \{\
              const max = Math.max(...categoryCounts.map(c => c[1]));\
              const height = (count / max) * 100;\
              return (\
                <div key=\{cat\} className="flex-1 flex flex-col items-center gap-2 group">\
                  <div \
                    className="w-full bg-emerald-500 rounded-t-sm hover:bg-emerald-600 transition-all relative group-hover:scale-y-105 origin-bottom"\
                    style=\{\{ height: `$\{height\}%` \}\}\
                  >\
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">\
                      \{count\} items\
                    </div>\
                  </div>\
                </div>\
              )\
            \})\}\
          </div>\
          <div className="flex justify-between gap-2 mt-2 overflow-x-auto pb-2">\
             \{categoryCounts.map(([cat]) => (\
               <div key=\{cat\} className="flex-1 text-center">\
                 <p className="text-[10px] text-slate-500 truncate w-full px-1" title=\{cat\}>\{cat\}</p>\
               </div>\
             ))\}\
          </div>\
        </div>\
\
        \{/* Pie Chart: Recipes by Category (Department) */\}\
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">\
          <div className="flex items-center justify-between mb-4">\
            <h3 className="font-bold text-slate-800 flex items-center gap-2">\
              <PieChart className="w-5 h-5 text-slate-400" />\
              Recipes by Department\
            </h3>\
          </div>\
          <div className="flex flex-1 items-center justify-center gap-8">\
             \{/* CSS Conic Gradient Pie Chart */\}\
             <div className="w-48 h-48 rounded-full shadow-inner relative" style=\{\{ background: pieGradient \}\}>\
                <div className="absolute inset-0 m-12 bg-white rounded-full flex items-center justify-center flex-col shadow-sm">\
                   <span className="text-2xl font-bold text-slate-800">\{recipes.length\}</span>\
                   <span className="text-[10px] text-slate-400 uppercase tracking-wide">Total</span>\
                </div>\
             </div>\
             \
             \{/* Legend */\}\
             <div className="space-y-2">\
                \{recipeCategoryCounts.map(([cat, count], idx) => (\
                  <div key=\{cat\} className="flex items-center gap-2">\
                    <div className="w-3 h-3 rounded-full" style=\{\{ backgroundColor: COLORS[idx % COLORS.length] \}\}></div>\
                    <span className="text-xs text-slate-600 font-medium">\{cat\}</span>\
                    <span className="text-xs text-slate-400">(\{count\})</span>\
                  </div>\
                ))\}\
             </div>\
          </div>\
        </div>\
      </div>\
\
      \{/* Top 10 Tables */\}\
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">\
        \
        \{/* Top Ingredients */\}\
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">\
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">\
             <h3 className="font-bold text-slate-800 flex items-center gap-2">\
               <TrendingUp className="w-4 h-4 text-emerald-600" />\
               Top Expensive Raw Materials\
             </h3>\
             <span className="text-xs text-slate-500">Per Unit Cost</span>\
          </div>\
          <table className="w-full text-sm text-left">\
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">\
              <tr>\
                <th className="px-4 py-2">Name</th>\
                <th className="px-4 py-2">Category</th>\
                <th className="px-4 py-2 text-right">Cost</th>\
              </tr>\
            </thead>\
            <tbody className="divide-y divide-slate-100">\
              \{topIngredients.map((item, idx) => (\
                <tr key=\{item.id\} className="hover:bg-slate-50">\
                  <td className="px-4 py-2.5 font-medium text-slate-700 truncate max-w-[150px]">\{idx + 1\}. \{item.name\}</td>\
                  <td className="px-4 py-2.5 text-slate-500 text-xs">\{item.category\}</td>\
                  <td className="px-4 py-2.5 text-right font-bold text-emerald-600">\{formatCurrency(item.cost)\}</td>\
                </tr>\
              ))\}\
            </tbody>\
          </table>\
        </div>\
\
        \{/* Top Recipes */\}\
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">\
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">\
             <h3 className="font-bold text-slate-800 flex items-center gap-2">\
               <ChefHat className="w-4 h-4 text-orange-600" />\
               Top Expensive Recipes\
             </h3>\
             <span className="text-xs text-slate-500">Total Cost</span>\
          </div>\
          <table className="w-full text-sm text-left">\
            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">\
              <tr>\
                <th className="px-4 py-2">Recipe Name</th>\
                <th className="px-4 py-2">Department</th>\
                <th className="px-4 py-2 text-right">Cost</th>\
              </tr>\
            </thead>\
            <tbody className="divide-y divide-slate-100">\
              \{topRecipes.map((item, idx) => \{\
                const cost = item.recipeIngredients.reduce((s, i) => s + (i.cost || 0), 0);\
                return (\
                  <tr key=\{item.id\} className="hover:bg-slate-50">\
                    <td className="px-4 py-2.5 font-medium text-slate-700 truncate max-w-[150px]">\{idx + 1\}. \{item.name\}</td>\
                    <td className="px-4 py-2.5 text-slate-500 text-xs">\{item.category\}</td>\
                    <td className="px-4 py-2.5 text-right font-bold text-orange-600">\{formatCurrency(cost)\}</td>\
                  </tr>\
                )\
              \})\}\
            </tbody>\
          </table>\
        </div>\
      </div>\
\
      \{/* Department Counts Breakdown */\}\
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">\
         <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">\
            <Tags className="w-5 h-5 text-slate-400" />\
            Department & Category Breakdown\
         </h3>\
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">\
            \{Object.entries(deptStats).map(([dept, counts]) => (\
              <div key=\{dept\} className="p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">\
                 <p className="font-semibold text-slate-700 text-sm mb-2 truncate" title=\{dept\}>\{dept\}</p>\
                 <div className="flex justify-between items-center text-xs text-slate-500">\
                    <span>Recipes</span>\
                    <span className="font-bold text-slate-800 bg-white px-1.5 py-0.5 rounded shadow-sm">\{counts.recipes\}</span>\
                 </div>\
                 <div className="flex justify-between items-center text-xs text-slate-500 mt-1">\
                    <span>Materials</span>\
                    <span className="font-bold text-slate-800 bg-white px-1.5 py-0.5 rounded shadow-sm">\{counts.ingredients\}</span>\
                 </div>\
              </div>\
            ))\}\
         </div>\
      </div>\
\
    </div>\
  );\
\};\
\
// --- Page Components ---\
\
const IngredientDetailPage = (\{ ingredient, onBack, onEdit, onDelete \}) => \{\
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);\
  const [currentImageIndex, setCurrentImageIndex] = useState(0);\
  const [showActions, setShowActions] = useState(false);\
 \
  // Check if it's a recipe\
  const isRecipe = !!ingredient.recipeIngredients;\
  const hasImages = ingredient.images && ingredient.images.length > 0;\
    \
  const handleOpenLightbox = (index = 0) => \{\
    if (hasImages) \{\
      setCurrentImageIndex(index);\
      setIsLightboxOpen(true);\
    \}\
  \};\
 \
  // Recipe Specific Calculations for Display\
  const totalWeight = isRecipe ? ingredient.recipeIngredients.reduce((acc, curr) => acc + (curr.qty || 0), 0) : 0;\
  const totalCost = isRecipe ? ingredient.recipeIngredients.reduce((acc, curr) => acc + (curr.cost || 0), 0) : 0;\
  const productionLoss = isRecipe ? Math.max(0, totalWeight - (ingredient.yieldQty || 0)) : 0;\
  const lossPercentage = isRecipe && totalWeight > 0 ? (productionLoss / totalWeight) * 100 : 0;\
  const costPerKilo = isRecipe && ingredient.yieldQty > 0 ? (totalCost / (ingredient.yieldQty / 1000)) : 0;\
 \
  return (\
    <div className="flex flex-col h-full bg-slate-50 animate-in fade-in slide-in-from-right-8 duration-300 relative">\
      <div className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-20">\
        <div className="flex items-center gap-4">\
          <button onClick=\{onBack\} className="p-2 -ml-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors">\
            <ArrowLeft className="w-6 h-6" />\
          </button>\
          <div>\
            <div className="flex flex-col mb-1">\
              <h1 className="text-2xl font-bold text-slate-900">\{ingredient.name\}</h1>\
              \{isRecipe && <span className="text-sm font-medium text-slate-500">\{ingredient.brand\}</span>\}\
            </div>\
            <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">\
               <StatusBadge status=\{ingredient.status\} />\
               <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-600 font-semibold">\{ingredient.articleCode\}</span>\
               <span className="text-slate-300">|</span>\
               <span>\{ingredient.category\}</span>\
            </div>\
          </div>\
        </div>\
 \
        <div className="flex items-center gap-3">\
           <button onClick=\{() => hasImages ? handleOpenLightbox(0) : null\} className=\{`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors border border-slate-200 bg-white $\{hasImages ? 'text-slate-700 hover:bg-slate-50' : 'text-slate-400 cursor-not-allowed'\}`\}>\
            <Camera className="w-4 h-4" /> Photo\
          </button>\
           <div className="relative">\
             <button onClick=\{() => setShowActions(!showActions)\} className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 rounded-lg text-slate-700 font-medium transition-colors border border-slate-200 bg-white">\
              Actions <ChevronDown className="w-4 h-4 text-slate-400" />\
            </button>\
            \{showActions && (\
              <>\
                <div className="fixed inset-0 z-10" onClick=\{() => setShowActions(false)\}></div>\
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-20 animate-in fade-in zoom-in-95 duration-200">\
                  \{onEdit && (\
                    <button onClick=\{() => \{ onEdit(ingredient); setShowActions(false); \}\} className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 flex items-center gap-2">\
                      <Edit3 className="w-4 h-4" /> Edit \{isRecipe ? 'Recipe' : 'Item'\}\
                    </button>\
                  )\}\
                  \{onDelete && (\
                    <>\
                      <div className="h-px bg-slate-100 my-1"></div>\
                      <button onClick=\{() => \{ onDelete(ingredient.id); setShowActions(false); \}\} className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2">\
                        <Trash2 className="w-4 h-4" /> Delete \{isRecipe ? 'Recipe' : 'Item'\}\
                      </button>\
                    </>\
                  )\}\
                </div>\
              </>\
            )\}\
          </div>\
        </div>\
      </div>\
      <div className="flex-1 overflow-y-auto p-8">\
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">\
          <div className="space-y-6">\
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-fit">\
                   <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center gap-2">\
                       \{isRecipe ? <ChefHat className="w-4 h-4 text-slate-400" /> : <Info className="w-4 h-4 text-slate-400" />\}\
                       <h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">\{isRecipe ? 'Recipe Details' : 'General Information'\}</h3>\
                   </div>\
                   <div className="p-5 space-y-4">\
                        \{isRecipe ? (\
                             <div className="grid grid-cols-2 gap-4">\
                                <div><p className="text-xs text-slate-500 font-medium uppercase">Cook Time</p><p className="text-sm font-semibold text-slate-800">\{ingredient.origin || 'N/A'\}</p></div>\
                                <div><p className="text-xs text-slate-500 font-medium uppercase">Temp Time</p><p className="text-sm font-semibold text-slate-800">\{ingredient.supplier || 'N/A'\}</p></div>\
                                <div className="col-span-2"><p className="text-xs text-slate-500 font-medium uppercase mb-1">Product Info / Procedure</p><p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 whitespace-pre-wrap leading-relaxed">\{ingredient.productInfo || 'No procedure details added.'\}</p></div>\
                             </div>\
                        ) : (\
                           <div className="grid grid-cols-1 gap-4">\
                                <div className="flex items-start gap-3"><div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Truck className="w-4 h-4" /></div><div><p className="text-xs text-slate-500 font-medium uppercase">Supplier</p><p className="text-sm font-semibold text-slate-800">\{ingredient.supplier || 'N/A'\}</p></div></div>\
                                <div className="flex items-start gap-3"><div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><MapPin className="w-4 h-4" /></div><div><p className="text-xs text-slate-500 font-medium uppercase">Origin</p><p className="text-sm font-semibold text-slate-800">\{ingredient.origin || 'N/A'\}</p></div></div>\
                           </div>\
                        )\}\
                   </div>\
              </div>\
              \{isRecipe && (\
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-fit">\
                        <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center gap-2"><DollarSign className="w-4 h-4 text-slate-400" /><h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">Yield & Costing</h3></div>\
                        <div className="p-5 grid grid-cols-2 gap-4">\
                            <div><p className="text-xs text-slate-500 font-medium uppercase">Yield Qty</p><p className="text-lg font-bold text-slate-800">\{ingredient.yieldQty\} g</p></div>\
                            <div><p className="text-xs text-slate-500 font-medium uppercase">Per Kilo Cost</p><p className="text-lg font-bold text-emerald-600">\{formatCurrency(costPerKilo)\}</p></div>\
                            <div className="pt-2 border-t border-slate-100"><p className="text-xs text-slate-500 font-medium uppercase">Production Loss</p><p className="text-sm font-medium text-slate-700">\{productionLoss.toFixed(0)\} g</p></div>\
                            <div className="pt-2 border-t border-slate-100"><p className="text-xs text-slate-500 font-medium uppercase">Loss %</p><p className="text-sm font-bold text-red-500">\{lossPercentage.toFixed(1)\}%</p></div>\
                        </div>\
                  </div>\
              )\}\
          </div>\
          <div className="space-y-6">\
               \{isRecipe ? (\
                   <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-fit">\
                        <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center gap-2"><ListIcon className="w-4 h-4 text-slate-400" /><h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">Recipe Ingredients</h3></div>\
                        <table className="w-full text-left text-sm">\
                            <thead className="bg-slate-50/50 text-xs text-slate-500 uppercase"><tr><th className="px-4 py-2">Name</th><th className="px-4 py-2 text-right">Qty</th><th className="px-4 py-2 text-right">Cost</th></tr></thead>\
                            <tbody className="divide-y divide-slate-100">\
                                \{ingredient.recipeIngredients.map((item, idx) => (\
                                    <tr key=\{idx\}><td className="px-4 py-2">\{item.name\}</td><td className="px-4 py-2 text-right">\{item.qty\}g</td><td className="px-4 py-2 text-right text-slate-600">\{formatCurrency(item.cost)\}</td></tr>\
                                ))\}\
                            </tbody>\
                            <tfoot className="bg-slate-50 font-medium text-slate-800"><tr><td className="px-4 py-2">Total</td><td className="px-4 py-2 text-right">\{totalWeight\}g</td><td className="px-4 py-2 text-right">\{formatCurrency(totalCost)\}</td></tr></tfoot>\
                        </table>\
                   </div>\
               ) : (\
                   <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-fit">\
                        <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center gap-2"><Box className="w-4 h-4 text-slate-400" /><h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">Inventory & Costing</h3></div>\
                        <div className="p-5 space-y-5">\
                            <div className="flex justify-between items-end border-b border-slate-100 pb-3"><div><p className="text-xs text-slate-500 font-medium uppercase mb-1">Cost Price</p><div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-emerald-600">\{formatCurrency(ingredient.cost)\}</span><span className="text-xs text-slate-400">/ \{ingredient.baseUnit\}</span></div></div><div className="text-right"><p className="text-xs text-slate-500 font-medium uppercase mb-1">Current Stock</p><span className="text-xl font-bold text-slate-800">\{ingredient.stock\}</span><span className="text-xs text-slate-500 ml-1">\{ingredient.baseUnit\}</span></div></div>\
                        </div>\
                   </div>\
               )\}\
               <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-fit">\
                   <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center gap-2"><Check className="w-4 h-4 text-slate-400" /><h3 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">Compliance & Dietary</h3></div>\
                   <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">\
                       <div><div className="flex items-center gap-2 mb-3"><AlertTriangle className="w-4 h-4 text-orange-500" /><span className="font-semibold text-slate-800 text-sm">Allergens</span></div><div className="flex flex-wrap gap-2">\{Object.entries(ingredient.allergens).filter(([_, v]) => v).length > 0 ? (Object.entries(ingredient.allergens).filter(([_, exists]) => exists).map(([allergen]) => (<span key=\{allergen\} className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-100 rounded-full text-xs font-bold uppercase flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>\{allergen\}</span>))) : (<span className="text-slate-400 text-sm italic">No allergens marked</span>)\}</div></div>\
                       <div><div className="flex items-center gap-2 mb-3"><Leaf className="w-4 h-4 text-emerald-500" /><span className="font-semibold text-slate-800 text-sm">Diet Suitability</span></div><div className="flex flex-wrap gap-2">\{Object.entries(ingredient.diet).filter(([_, v]) => v).length > 0 ? (Object.entries(ingredient.diet).filter(([_, suitable]) => suitable).map(([diet]) => (<span key=\{diet\} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-bold uppercase flex items-center gap-1.5"><Check className="w-3 h-3" />\{diet\}</span>))) : (<span className="text-slate-400 text-sm italic">No diet info available</span>)\}</div></div>\
                   </div>\
               </div>\
          </div>\
           <div className="h-fit"><NutritionFactLabel nutrition=\{ingredient.nutrition\} /></div>\
        </div>\
      </div>\
    </div>\
  );\
\};\
\
// --- Modals ---\
\
const IngredientModal = (\{ isOpen, onClose, ingredient, onSave, type = 'ingredient', allIngredients = [] \}) => \{\
  if (!isOpen) return null;\
 \
  const isEditing = !!ingredient;\
  const isRecipe = type === 'recipe';\
  const [activeTab, setActiveTab] = useState('general');\
  const [recipeSearch, setRecipeSearch] = useState('');\
   \
  // Initial State Setup\
  const [formData, setFormData] = useState(ingredient || \{\
    articleCode: '', name: '', category: '', brand: '', origin: '', supplier: '', productInfo: '', \
    recipeIngredients: [], yieldQty: 0, \
    baseQty: 1000, baseUnit: 'G', cost: 0, storeUnit: '',\
    nutrition: \{ calories: 0, carbs: 0, fiber: 0, sugar: 0, protein: 0, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, sodium: 0 \},\
    allergens: \{\}, diet: \{\}, images: []\
  \});\
 \
  const handleInputChange = (field, value) => setFormData(prev => (\{ ...prev, [field]: value \}));\
  const handleNutritionChange = (field, value) => setFormData(prev => (\{ ...prev, nutrition: \{ ...prev.nutrition, [field]: value \} \}));\
  const handleToggle = (category, item) => setFormData(prev => \{ const currentCategory = prev[category] || \{\}; return \{ ...prev, [category]: \{ ...currentCategory, [item]: !currentCategory[item] \} \}; \});\
  const handleImageUpload = (e) => \{ const files = Array.from(e.target.files); const newImageUrls = files.map(file => URL.createObjectURL(file)); setFormData(prev => (\{ ...prev, images: [...prev.images, ...newImageUrls] \})); \};\
  const removeImage = (index) => setFormData(prev => (\{ ...prev, images: prev.images.filter((_, i) => i !== index) \}));\
 \
  // --- Recipe Building Logic ---\
  const availableIngredients = useMemo(() => \{\
    if (!recipeSearch) return [];\
    const source = allIngredients.length > 0 ? allIngredients : INITIAL_INGREDIENTS;\
    return source.filter(i => i.name.toLowerCase().includes(recipeSearch.toLowerCase()) || i.articleCode.toLowerCase().includes(recipeSearch.toLowerCase()));\
  \}, [recipeSearch, allIngredients]);\
 \
  const addIngredientToRecipe = (ing) => \{\
      const newIngredients = [...(formData.recipeIngredients || []), \{ id: ing.id, articleCode: ing.articleCode, name: ing.name, qty: 0, unit: 'g', baseCost: ing.cost, baseUnitQty: ing.baseQty || 1000, cost: 0, raw: ing \}];\
      setFormData(prev => (\{ ...prev, recipeIngredients: newIngredients \}));\
      updateCalculations(newIngredients);\
      setRecipeSearch(''); \
  \};\
 \
  const updateRecipeIngredientQty = (index, newQty) => \{\
      const qty = parseFloat(newQty) || 0;\
      setFormData(prev => \{\
          const updatedIngredients = [...(prev.recipeIngredients || [])];\
          const item = updatedIngredients[index];\
          const costPerGram = item.baseCost / (item.baseUnitQty || 1000); \
          item.qty = qty;\
          item.cost = costPerGram * qty;\
          return \{ ...prev, recipeIngredients: updatedIngredients \};\
      \});\
      updateCalculations([...(formData.recipeIngredients || [])]); \
  \};\
 \
  const removeRecipeIngredient = (index) => \{\
      const updatedIngredients = formData.recipeIngredients.filter((_, i) => i !== index);\
      setFormData(prev => (\{ ...prev, recipeIngredients: updatedIngredients \}));\
      updateCalculations(updatedIngredients);\
  \};\
 \
  const updateCalculations = (currentIngredients) => \{\
      if (!isRecipe) return;\
      const totalWeight = currentIngredients.reduce((acc, curr) => acc + (curr.qty || 0), 0);\
      let newNutrition = \{ calories: 0, carbs: 0, fiber: 0, sugar: 0, protein: 0, fat: 0, satFat: 0, transFat: 0, cholesterol: 0, sodium: 0 \};\
      let newAllergens = \{\};\
      let newDiet = \{\};\
      DIET_LIST.forEach(d => newDiet[d] = true);\
 \
      currentIngredients.forEach(item => \{\
         const factor = (item.qty || 0) / 100; \
         const nut = item.raw?.nutrition || \{\};\
         Object.keys(newNutrition).forEach(k => \{ newNutrition[k] += (nut[k] || 0) * factor; \});\
         const allg = item.raw?.allergens || \{\};\
         Object.keys(allg).forEach(k => \{ if (allg[k]) newAllergens[k] = true; \});\
         const dt = item.raw?.diet || \{\};\
         DIET_LIST.forEach(d => \{ if (!dt[d] && dt[d] !== undefined) newDiet[d] = false; if (dt[d] !== true) newDiet[d] = false; \});\
      \});\
 \
      if (totalWeight > 0) \{\
          Object.keys(newNutrition).forEach(k => \{ newNutrition[k] = (newNutrition[k] / totalWeight) * 100; newNutrition[k] = parseFloat(newNutrition[k].toFixed(2)); \});\
      \}\
      setFormData(prev => (\{ ...prev, nutrition: newNutrition, allergens: newAllergens, diet: newDiet \}));\
  \};\
 \
  const totalRecipeWeight = (formData.recipeIngredients || []).reduce((acc, curr) => acc + (curr.qty || 0), 0);\
  const totalRecipeCost = (formData.recipeIngredients || []).reduce((acc, curr) => acc + (curr.cost || 0), 0);\
  const yieldQty = parseFloat(formData.yieldQty) || 0;\
  const productionLoss = Math.max(0, totalRecipeWeight - yieldQty);\
  const lossPercentage = totalRecipeWeight > 0 ? (productionLoss / totalRecipeWeight) * 100 : 0;\
  const costPerKilo = yieldQty > 0 ? (totalRecipeCost / (yieldQty / 1000)) : 0; \
  const handleSubmit = (e) => \{ e.preventDefault(); onSave(formData); onClose(); \};\
  const tabs = [\{ id: 'general', label: 'General Info', icon: Info \}, \{ id: 'recipe_build', label: 'Recipe Build', icon: isRecipe ? ChefHat : DollarSign, hidden: !isRecipe \}, \{ id: 'costing', label: 'Costing & Unit', icon: DollarSign, hidden: isRecipe \}, \{ id: 'photos', label: 'Photos', icon: Camera \}, \{ id: 'nutrition', label: 'Nutrition Facts', icon: Activity \}, \{ id: 'allergens', label: 'Allergens', icon: AlertTriangle \}, \{ id: 'diet', label: 'Diet Suitability', icon: Leaf \}].filter(t => !t.hidden);\
 \
  return (\
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">\
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">\
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50">\
          <div className="flex items-center gap-3">\
            <div className=\{`p-2 rounded-lg $\{isEditing ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'\}`\}>\{isEditing ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />\}</div>\
            <div><h2 className="text-lg font-bold text-slate-800">\{isEditing ? (isRecipe ? 'Edit Recipe' : 'Edit Item') : (isRecipe ? 'New Recipe' : 'New Item')\}</h2><p className="text-xs text-slate-500">\{isEditing ? `Editing $\{formData.articleCode\}` : 'Create a new record'\}</p></div>\
          </div>\
          <button onClick=\{onClose\} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 p-2 rounded-full transition-colors"><X className="w-5 h-5" /></button>\
        </div>\
        <div className="flex flex-1 overflow-hidden">\
          <div className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col py-4">\
            \{tabs.map((tab) => (\
              <button key=\{tab.id\} onClick=\{() => setActiveTab(tab.id)\} className=\{`flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-all relative $\{activeTab === tab.id ? 'text-emerald-700 bg-white shadow-sm border-y border-slate-100 z-10' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'\}`\}>\
                \{activeTab === tab.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r"></div>\}\
                <tab.icon className=\{`w-4 h-4 $\{activeTab === tab.id ? 'text-emerald-500' : 'text-slate-400'\}`\} />\{tab.label\}\
              </button>\
            ))\}\
          </div>\
          <div className="flex-1 overflow-y-auto p-8 bg-white">\
            <form id="ingredientForm" onSubmit=\{handleSubmit\} className="max-w-3xl mx-auto space-y-6">\
              \{activeTab === 'general' && (\
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">\
                  <div className="grid grid-cols-2 gap-6">\
                    <div className="space-y-1.5"><label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Article Code</label><input required type="text" value=\{formData.articleCode\} onChange=\{(e) => handleInputChange('articleCode', e.target.value)\} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-mono text-sm" placeholder="e.g. 1080023" /></div>\
                    <div className="space-y-1.5"><label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">\{isRecipe ? 'Department' : 'Item Group'\}</label><select value=\{formData.category\} onChange=\{(e) => handleInputChange('category', e.target.value)\} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none transition-all text-sm"><option value="">Select Group</option><option value="Dry Goods">Dry Goods</option><option value="Dairy">Dairy</option><option value="Meat">Meat</option><option value="Hot Kitchen">Hot Kitchen</option></select></div>\
                  </div>\
                  <div className="space-y-1.5"><label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Name</label><input required type="text" value=\{formData.name\} onChange=\{(e) => handleInputChange('name', e.target.value)\} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none transition-all text-sm font-medium" /></div>\
                  <div className="grid grid-cols-2 gap-6">\
                    <div className="space-y-1.5"><label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">\{isRecipe ? 'Category' : 'Brand'\}</label><input type="text" value=\{formData.brand\} onChange=\{(e) => handleInputChange('brand', e.target.value)\} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none transition-all text-sm" /></div>\
                    <div className="space-y-1.5"><label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">\{isRecipe ? 'Cook Time' : 'Origin'\}</label><input type="text" value=\{formData.origin\} onChange=\{(e) => handleInputChange('origin', e.target.value)\} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none transition-all text-sm" /></div>\
                  </div>\
                  <div className="space-y-1.5"><label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">\{isRecipe ? 'Temp Time' : 'Supplier'\}</label><input type="text" value=\{formData.supplier\} onChange=\{(e) => handleInputChange('supplier', e.target.value)\} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none transition-all text-sm" /></div>\
                  \{isRecipe && <div className="space-y-1.5"><label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Product Info</label><textarea value=\{formData.productInfo\} onChange=\{(e) => handleInputChange('productInfo', e.target.value)\} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none transition-all text-sm min-h-[100px]" /></div>\}\
                </div>\
              )\}\
              \{activeTab === 'recipe_build' && isRecipe && (\
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">\
                      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" placeholder="Search ingredient..." value=\{recipeSearch\} onChange=\{(e) => setRecipeSearch(e.target.value)\} className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />\
                          \{recipeSearch && (\
                              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto">\
                                  \{availableIngredients.length > 0 ? (availableIngredients.map(ing => (\
                                          <div key=\{ing.id\} onClick=\{() => addIngredientToRecipe(ing)\} className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0 flex justify-between items-center"><div><div className="font-medium text-slate-800 text-sm">\{ing.name\}</div><div className="text-xs text-slate-400 font-mono">\{ing.articleCode\}</div></div><Plus className="w-4 h-4 text-emerald-600" /></div>\
                                      ))) : (<div className="p-4 text-center text-slate-500 text-sm">No ingredients found.</div>)\}\
                              </div>\
                          )\}\
                      </div>\
                      <div className="border border-slate-200 rounded-lg overflow-hidden">\
                          <table className="w-full text-left text-sm"><thead className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase font-semibold"><tr><th className="px-4 py-3">Code</th><th className="px-4 py-3">Name</th><th className="px-4 py-3 w-24">Qty</th><th className="px-4 py-3 text-right">Cost</th><th className="w-10"></th></tr></thead>\
                              <tbody className="divide-y divide-slate-100">\
                                  \{formData.recipeIngredients.map((item, idx) => (\
                                      <tr key=\{idx\}><td className="px-4 py-2 font-mono text-xs">\{item.articleCode\}</td><td className="px-4 py-2">\{item.name\}</td><td className="px-4 py-2"><input type="number" value=\{item.qty\} onChange=\{(e) => updateRecipeIngredientQty(idx, e.target.value)\} className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-center outline-none" /></td><td className="px-4 py-2 text-right">\{formatCurrency(item.cost)\}</td><td className="px-4 py-2 text-center"><button onClick=\{() => removeRecipeIngredient(idx)\} className="text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button></td></tr>\
                                  ))\}\
                              </tbody>\
                          </table>\
                      </div>\
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 space-y-4">\
                          <div className="grid grid-cols-2 gap-6"><div className="space-y-1.5"><label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Yield Qty (g)</label><input type="number" value=\{formData.yieldQty\} onChange=\{(e) => handleInputChange('yieldQty', e.target.value)\} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none text-sm font-medium" /></div><div className="space-y-1.5"><label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Per Kilo Cost</label><div className="w-full px-3 py-2 bg-white border border-emerald-100 text-emerald-700 rounded-lg text-sm font-bold flex justify-between items-center"><span>\{formatCurrency(costPerKilo)\}</span><span className="text-[10px] text-emerald-400 font-normal uppercase">/ kg</span></div></div></div>\
                      </div>\
                  </div>\
              )\}\
              \{activeTab === 'costing' && !isRecipe && (\
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">\
                  <div className="grid grid-cols-3 gap-6">\
                    <div className="space-y-1.5"><label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Base Qty</label><input type="number" value=\{formData.baseQty\} onChange=\{(e) => handleInputChange('baseQty', e.target.value)\} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm" /></div>\
                    <div className="space-y-1.5"><label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Base Unit</label><input type="text" value=\{formData.baseUnit\} onChange=\{(e) => handleInputChange('baseUnit', e.target.value)\} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm" /></div>\
                    <div className="space-y-1.5"><label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Cost</label><input type="number" step="0.001" value=\{formData.cost\} onChange=\{(e) => handleInputChange('cost', e.target.value)\} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm" /></div>\
                  </div>\
                  <div className="space-y-1.5"><label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Store Unit</label><input type="text" value=\{formData.storeUnit\} onChange=\{(e) => handleInputChange('storeUnit', e.target.value)\} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm" /></div>\
                </div>\
              )\}\
              \{activeTab === 'nutrition' && (\
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">\
                  <div className="grid grid-cols-2 gap-6">\
                    <div className="space-y-1.5"><label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Calories</label><input type="number" value=\{formData.nutrition.calories\} onChange=\{(e) => handleNutritionChange('calories', e.target.value)\} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm" /></div>\
                    <div className="space-y-1.5"><label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Protein</label><input type="number" value=\{formData.nutrition.protein\} onChange=\{(e) => handleNutritionChange('protein', e.target.value)\} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm" /></div>\
                  </div>\
                </div>\
              )\}\
              \{activeTab === 'allergens' && (\
                <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-right-4 duration-300">\
                    \{ALLERGEN_LIST.map((allergen) => (\
                      <label key=\{allergen\} className=\{`flex items-center justify-between p-3 rounded-lg border cursor-pointer $\{formData.allergens[allergen] ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'\}`\}>\
                        <span className="text-sm font-medium text-slate-700">\{allergen\}</span>\
                        <input type="checkbox" className="sr-only" checked=\{!!formData.allergens[allergen]\} onChange=\{() => handleToggle('allergens', allergen)\} />\
                        <div className=\{`w-8 h-5 rounded-full relative transition-colors $\{formData.allergens[allergen] ? 'bg-red-500' : 'bg-slate-300'\}`\}><div className=\{`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform $\{formData.allergens[allergen] ? 'translate-x-3' : ''\}`\}></div></div>\
                      </label>\
                    ))\}\
                </div>\
              )\}\
              \{activeTab === 'diet' && (\
                 <div className="grid grid-cols-1 gap-3 animate-in fade-in slide-in-from-right-4 duration-300">\
                    \{DIET_LIST.map((diet) => (\
                      <label key=\{diet\} className=\{`flex items-center justify-between p-4 rounded-lg border cursor-pointer $\{formData.diet[diet] ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'\}`\}>\
                        <span className="text-sm font-medium text-slate-700">\{diet\}</span>\
                        <div className=\{`w-6 h-6 rounded-full flex items-center justify-center border $\{formData.diet[diet] ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-slate-300'\}`\}>\{formData.diet[diet] && <Check className="w-4 h-4" />\}</div>\
                        <input type="checkbox" className="sr-only" checked=\{!!formData.diet[diet]\} onChange=\{() => handleToggle('diet', diet)\} />\
                      </label>\
                    ))\}\
                 </div>\
              )\}\
            </form>\
          </div>\
        </div>\
        <div className="p-4 border-t border-slate-200 bg-white flex justify-end gap-3 z-20">\
          <button type="button" onClick=\{onClose\} className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>\
          <button type="submit" form="ingredientForm" className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 shadow-sm transition-all flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>\
        </div>\
      </div>\
    </div>\
  );\
\};\
\
// --- Authentication Components ---\
\
const LoginPage = (\{ onLogin, users \}) => \{\
  const [username, setUsername] = useState('');\
  const [password, setPassword] = useState('');\
  const [showPassword, setShowPassword] = useState(false);\
  const [error, setError] = useState('');\
\
  const handleSubmit = (e) => \{\
    e.preventDefault();\
    const user = users.find(u => u.username === username && u.password === password);\
    if (user) \{\
      onLogin(user);\
    \} else \{\
      setError('Invalid credentials');\
    \}\
  \};\
\
  return (\
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">\
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-200">\
        <div className="bg-slate-900 p-8 text-center">\
          <div className="w-16 h-16 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-900/50">\
            <ChefHat className="w-8 h-8 text-white" />\
          </div>\
          <h1 className="text-2xl font-bold text-white">Menu Engineer</h1>\
          <p className="text-slate-400 text-sm mt-1">Please sign in to continue</p>\
        </div>\
        <form onSubmit=\{handleSubmit\} className="p-8 space-y-6">\
          \{error && (\
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">\
              <AlertCircle className="w-4 h-4" />\
              \{error\}\
            </div>\
          )\}\
          <div className="space-y-2">\
            <label className="text-sm font-bold text-slate-700">Username</label>\
            <div className="relative">\
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />\
              <input \
                type="text" \
                value=\{username\}\
                onChange=\{(e) => setUsername(e.target.value)\}\
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"\
                placeholder="Enter username"\
              />\
            </div>\
          </div>\
          <div className="space-y-2">\
            <label className="text-sm font-bold text-slate-700">Password</label>\
            <div className="relative">\
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />\
              <input \
                type=\{showPassword ? "text" : "password"\}\
                value=\{password\}\
                onChange=\{(e) => setPassword(e.target.value)\}\
                className="w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"\
                placeholder="\'95\'95\'95\'95\'95\'95\'95\'95"\
              />\
              <button \
                type="button"\
                onClick=\{() => setShowPassword(!showPassword)\}\
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"\
              >\
                \{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />\}\
              </button>\
            </div>\
          </div>\
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-200">\
            Sign In\
          </button>\
          \
          <div className="mt-6 pt-6 border-t border-slate-100">\
            <p className="text-xs text-center text-slate-400 uppercase font-bold tracking-wider mb-3">Available Logins</p>\
            <div className="grid grid-cols-3 gap-2 text-xs text-center">\
              <div className="p-2 bg-slate-50 rounded border border-slate-200">\
                <span className="font-bold text-slate-700">admin</span> / 123\
              </div>\
              <div className="p-2 bg-slate-50 rounded border border-slate-200">\
                <span className="font-bold text-slate-700">chef</span> / 123\
              </div>\
              <div className="p-2 bg-slate-50 rounded border border-slate-200">\
                <span className="font-bold text-slate-700">view</span> / 123\
              </div>\
            </div>\
          </div>\
        </form>\
      </div>\
    </div>\
  );\
\};\
\
const UserManagementModal = (\{ isOpen, onClose, users, setUsers, currentUser \}) => \{\
  const [newUser, setNewUser] = useState(\{ username: '', password: '', role: 'Viewer', name: '' \});\
  const [isEditing, setIsEditing] = useState(null);\
  const [showPassword, setShowPassword] = useState(false);\
\
  if (!isOpen) return null;\
\
  const handleSave = () => \{\
    if (!newUser.username || !newUser.password) return;\
    \
    if (isEditing) \{\
      setUsers(users.map(u => u.id === isEditing ? \{ ...newUser, id: isEditing \} : u));\
      setIsEditing(null);\
    \} else \{\
      setUsers([...users, \{ ...newUser, id: Date.now() \}]);\
    \}\
    setNewUser(\{ username: '', password: '', role: 'Viewer', name: '' \});\
    setShowPassword(false);\
  \};\
\
  const handleEdit = (user) => \{\
    setNewUser(user);\
    setIsEditing(user.id);\
    setShowPassword(false);\
  \};\
\
  const handleDelete = (id) => \{\
    if (id === currentUser.id) \{\
      alert("You cannot delete yourself.");\
      return;\
    \}\
    if (window.confirm("Delete this user?")) \{\
      setUsers(users.filter(u => u.id !== id));\
    \}\
  \};\
\
  return (\
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">\
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden">\
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 bg-slate-50">\
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">\
            <Users className="w-5 h-5 text-emerald-600" />\
            User Management\
          </h2>\
          <button onClick=\{onClose\}><X className="w-5 h-5 text-slate-400" /></button>\
        </div>\
        \
        <div className="flex-1 overflow-auto p-6 flex gap-6">\
          \{/* Form */\}\
          <div className="w-1/3 space-y-4 border-r border-slate-100 pr-6">\
            <h3 className="font-bold text-slate-700">\{isEditing ? 'Edit User' : 'Add New User'\}</h3>\
            <input \
              className="w-full px-3 py-2 border rounded-lg text-sm" \
              placeholder="Full Name"\
              value=\{newUser.name\}\
              onChange=\{e => setNewUser(\{...newUser, name: e.target.value\})\}\
            />\
            <input \
              className="w-full px-3 py-2 border rounded-lg text-sm" \
              placeholder="Username"\
              value=\{newUser.username\}\
              onChange=\{e => setNewUser(\{...newUser, username: e.target.value\})\}\
            />\
            \
            <div className="relative">\
              <input \
                className="w-full px-3 py-2 border rounded-lg text-sm pr-10" \
                placeholder="Password"\
                type=\{showPassword ? "text" : "password"\}\
                value=\{newUser.password\}\
                onChange=\{e => setNewUser(\{...newUser, password: e.target.value\})\}\
              />\
              <button \
                type="button"\
                onClick=\{() => setShowPassword(!showPassword)\}\
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"\
              >\
                \{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />\}\
              </button>\
            </div>\
\
            <select \
              className="w-full px-3 py-2 border rounded-lg text-sm"\
              value=\{newUser.role\}\
              onChange=\{e => setNewUser(\{...newUser, role: e.target.value\})\}\
            >\
              <option value="Administrator">Administrator</option>\
              <option value="Contributor">Contributor</option>\
              <option value="Viewer">Viewer</option>\
            </select>\
            \
            <div className="flex gap-2 pt-2">\
              <button onClick=\{handleSave\} className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">\
                \{isEditing ? 'Update' : 'Create User'\}\
              </button>\
              \{isEditing && (\
                <button onClick=\{() => \{ setIsEditing(null); setNewUser(\{ username: '', password: '', role: 'Viewer', name: '' \}); \}\} className="px-3 bg-slate-100 text-slate-600 rounded-lg text-sm">\
                  Cancel\
                </button>\
              )\}\
            </div>\
          </div>\
\
          \{/* List */\}\
          <div className="flex-1">\
            <table className="w-full text-left text-sm">\
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">\
                <tr>\
                  <th className="px-4 py-2">User</th>\
                  <th className="px-4 py-2">Role</th>\
                  <th className="px-4 py-2 text-right">Actions</th>\
                </tr>\
              </thead>\
              <tbody className="divide-y divide-slate-100">\
                \{users.map(user => (\
                  <tr key=\{user.id\} className="hover:bg-slate-50">\
                    <td className="px-4 py-3">\
                      <div className="font-medium text-slate-800">\{user.name\}</div>\
                      <div className="text-xs text-slate-400">@\{user.username\}</div>\
                    </td>\
                    <td className="px-4 py-3">\
                      <span className=\{`px-2 py-1 rounded-full text-xs font-bold border\
                        $\{user.role === 'Administrator' ? 'bg-purple-50 text-purple-700 border-purple-200' : \
                          user.role === 'Contributor' ? 'bg-blue-50 text-blue-700 border-blue-200' : \
                          'bg-slate-100 text-slate-600 border-slate-200'\}`\}>\
                        \{user.role\}\
                      </span>\
                    </td>\
                    <td className="px-4 py-3 text-right">\
                      <div className="flex justify-end gap-2">\
                        <button onClick=\{() => handleEdit(user)\} className="p-1 text-slate-400 hover:text-emerald-600"><Edit3 className="w-4 h-4" /></button>\
                        <button onClick=\{() => handleDelete(user.id)\} className="p-1 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>\
                      </div>\
                    </td>\
                  </tr>\
                ))\}\
              </tbody>\
            </table>\
          </div>\
        </div>\
      </div>\
    </div>\
  );\
\};\
\
// --- Main App Logic ---\
\
export default function App() \{\
  const [currentUser, setCurrentUser] = useState(null); // null means logged out\
  const [users, setUsers] = useState(INITIAL_USERS);\
  \
  // App States\
  const [activeTab, setActiveTab] = useState('Dashboard'); // Set Dashboard as default landing page\
  const [ingredients, setIngredients] = useState(INITIAL_INGREDIENTS);\
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);\
\
  // Script Loader for Excel\
  useEffect(() => \{\
    const script = document.createElement('script');\
    script.src = "https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.full.min.js";\
    script.async = true;\
    document.body.appendChild(script);\
    return () => document.body.removeChild(script);\
  \}, []);\
\
  if (!currentUser) \{\
    return <LoginPage onLogin=\{setCurrentUser\} users=\{users\} />;\
  \}\
\
  return (\
    <AuthenticatedApp \
      currentUser=\{currentUser\} \
      setCurrentUser=\{setCurrentUser\}\
      users=\{users\}\
      setUsers=\{setUsers\}\
      activeTab=\{activeTab\}\
      setActiveTab=\{setActiveTab\}\
      ingredients=\{ingredients\}\
      setIngredients=\{setIngredients\}\
      recipes=\{recipes\}\
      setRecipes=\{setRecipes\}\
    />\
  );\
\}\
\
// --- Authenticated Layout ---\
\
function AuthenticatedApp(\{ \
  currentUser, setCurrentUser, users, setUsers,\
  activeTab, setActiveTab, ingredients, setIngredients, recipes, setRecipes \
\}) \{\
  const [showProfileMenu, setShowProfileMenu] = useState(false);\
  const [showUserModal, setShowUserModal] = useState(false);\
\
  const handleLogout = () => \{\
    setCurrentUser(null);\
    setShowProfileMenu(false);\
  \};\
\
  return (\
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">\
      \{/* Sidebar */\}\
      <aside className="bg-slate-900 text-white flex flex-col flex-shrink-0 transition-all duration-300 w-20 hover:w-64 group z-50 relative">\
        <div className="p-6 flex items-center justify-between border-b border-slate-800 h-20">\
          <div className="flex items-center gap-3 w-full justify-center group-hover:justify-start transition-all">\
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">\
              <ChefHat className="w-5 h-5 text-white" />\
            </div>\
            <span className="font-bold text-lg tracking-tight whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 hidden group-hover:block">\
              Menu Engineer\
            </span>\
          </div>\
        </div>\
\
        <nav className="flex-1 px-3 py-6 space-y-1">\
          \{[\
            \{ name: 'Dashboard', icon: BarChart3 \},\
            \{ name: 'Ingredients', icon: Package \},\
            \{ name: 'Recipes', icon: ChefHat \},\
            \{ name: 'Forecast', icon: Activity \},\
            \{ name: 'Orders', icon: ShoppingCart \},\
            \{ name: 'Settings', icon: Settings \},\
          ].map((item) => (\
            <button\
              key=\{item.name\}\
              onClick=\{() => setActiveTab(item.name)\}\
              className=\{`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative\
                $\{activeTab === item.name\
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'\
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'\
                \}\
                justify-center group-hover:justify-start\
              `\}\
            >\
              <item.icon className="w-5 h-5 flex-shrink-0" />\
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 hidden group-hover:block whitespace-nowrap">\
                \{item.name\}\
              </span>\
            </button>\
          ))\}\
        </nav>\
\
        \{/* Profile Section */\}\
        <div className="p-4 border-t border-slate-800 relative">\
          <button \
            onClick=\{() => setShowProfileMenu(!showProfileMenu)\}\
            className="flex items-center gap-3 justify-center group-hover:justify-start transition-all w-full hover:bg-slate-800 p-2 rounded-lg"\
          >\
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600 flex-shrink-0 relative">\
              <span className="font-semibold text-sm text-slate-300">\
                \{currentUser.name.charAt(0)\}\
              </span>\
              <div className=\{`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 \
                $\{currentUser.role === 'Administrator' ? 'bg-purple-500' : currentUser.role === 'Contributor' ? 'bg-blue-500' : 'bg-slate-400'\}`\}></div>\
            </div>\
            <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 hidden group-hover:block text-left whitespace-nowrap">\
                <p className="text-sm font-medium text-white truncate">\{currentUser.name\}</p>\
                <p className="text-xs text-slate-500 truncate">\{currentUser.role\}</p>\
            </div>\
          </button>\
\
          \{/* Popup Menu */\}\
          \{showProfileMenu && (\
            <>\
              <div className="fixed inset-0 z-10 cursor-default" onClick=\{() => setShowProfileMenu(false)\}></div>\
              <div className="absolute bottom-full left-4 w-56 mb-2 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-20 animate-in fade-in zoom-in-95 duration-200">\
                <div className="px-4 py-3 border-b border-slate-100">\
                  <p className="text-sm font-bold text-slate-800">\{currentUser.name\}</p>\
                  <p className="text-xs text-slate-500 capitalize">\{currentUser.role\}</p>\
                </div>\
                \
                \{currentUser.role === 'Administrator' && (\
                  <button \
                    onClick=\{() => \{ setShowUserModal(true); setShowProfileMenu(false); \}\}\
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-emerald-600 flex items-center gap-2"\
                  >\
                    <Users className="w-4 h-4" />\
                    Manage Users\
                  </button>\
                )\}\
                \
                <button \
                  onClick=\{() => alert("Change password functionality would go here.")\}\
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"\
                >\
                  <Key className="w-4 h-4" />\
                  Change Password\
                </button>\
                \
                <div className="h-px bg-slate-100 my-1"></div>\
                \
                <button \
                  onClick=\{handleLogout\}\
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"\
                >\
                  <LogOut className="w-4 h-4" />\
                  Log Out\
                </button>\
              </div>\
            </>\
          )\}\
        </div>\
      </aside>\
\
      \{/* Main Content */\}\
      <main className="flex-1 flex flex-col overflow-hidden relative">\
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 z-10">\
          <h1 className="text-xl font-semibold text-slate-800 ml-12 md:ml-0 transition-all">\{activeTab\}</h1> \
        </header>\
\
        <div className="flex-1 overflow-auto bg-slate-50">\
          \{activeTab === 'Dashboard' ? <Dashboard ingredients=\{ingredients\} recipes=\{recipes\} /> :\
           activeTab === 'Ingredients' ? <IngredientsManager ingredients=\{ingredients\} setIngredients=\{setIngredients\} currentUser=\{currentUser\} /> : \
           activeTab === 'Recipes' ? <RecipesManager recipes=\{recipes\} setRecipes=\{setRecipes\} currentUser=\{currentUser\} /> : \
           activeTab === 'Forecast' ? <ForecastManager allIngredients=\{ingredients\} allRecipes=\{recipes\} /> : (\
            <div className="flex flex-col items-center justify-center h-full text-slate-400">\
              <Package className="w-16 h-16 mb-4 opacity-20" />\
              <p>Select "Dashboard", "Ingredients", "Recipes", or "Forecast".</p>\
            </div>\
          )\}\
        </div>\
      </main>\
\
      \{/* Admin User Management Modal */\}\
      <UserManagementModal \
        isOpen=\{showUserModal\} \
        onClose=\{() => setShowUserModal(false)\}\
        users=\{users\}\
        setUsers=\{setUsers\}\
        currentUser=\{currentUser\}\
      />\
    </div>\
  );\
\}\
\
// --- Managers with Permissions Logic ---\
\
function IngredientsManager(\{ ingredients, setIngredients, currentUser \}) \{\
  const [viewMode, setViewMode] = useState('list');\
  const [searchQuery, setSearchQuery] = useState('');\
  const [currentPage, setCurrentPage] = useState(1);\
  const itemsPerPage = 10;\
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);\
  const [viewingIngredient, setViewingIngredient] = useState(null);\
  const [editingIngredient, setEditingIngredient] = useState(null);\
  const [showFilterMenu, setShowFilterMenu] = useState(false);\
  const [activeFilterCount, setActiveFilterCount] = useState(''); \
  const fileInputRef = useRef(null);\
\
  // Permissions\
  const canAdd = currentUser.role === 'Administrator' || currentUser.role === 'Contributor';\
  const canEdit = currentUser.role === 'Administrator' || currentUser.role === 'Contributor';\
  const canDelete = currentUser.role === 'Administrator'; // Only Admin can delete\
\
  const filteredIngredients = useMemo(() => \{\
    let result = ingredients.filter(item => \
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||\
      item.articleCode.toLowerCase().includes(searchQuery.toLowerCase()) ||\
      item.brand.toLowerCase().includes(searchQuery.toLowerCase())\
    );\
    if (activeFilterCount && !isNaN(activeFilterCount) && Number(activeFilterCount) > 0) \{\
      result.sort((a, b) => b.cost - a.cost);\
      result = result.slice(0, Number(activeFilterCount));\
    \}\
    return result;\
  \}, [ingredients, searchQuery, activeFilterCount]);\
\
  useEffect(() => setCurrentPage(1), [searchQuery, activeFilterCount]);\
\
  const indexOfLastItem = currentPage * itemsPerPage;\
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;\
  const currentItems = filteredIngredients.slice(indexOfFirstItem, indexOfLastItem);\
  const totalPages = Math.ceil(filteredIngredients.length / itemsPerPage);\
\
  const handleSave = (data) => \{\
    if (editingIngredient) \{\
      setIngredients(ingredients.map(ing => ing.id === data.id ? data : ing));\
      if (viewingIngredient && viewingIngredient.id === data.id) setViewingIngredient(data);\
    \} else \{\
      setIngredients([...ingredients, \{ ...data, id: Date.now(), status: 'In Stock', imageType: 'package', images: data.images || [] \}]);\
    \}\
  \};\
\
  const handleDelete = (id) => \{\
    if (window.confirm('Are you sure you want to delete this ingredient?')) \{\
      setIngredients(ingredients.filter(i => i.id !== id));\
      setViewingIngredient(null);\
    \}\
  \};\
\
  const handleEdit = (ingredient) => \{\
    setEditingIngredient(ingredient);\
    setIsAddModalOpen(true);\
  \};\
\
  const handleView = (ingredient) => \{\
    setViewingIngredient(ingredient);\
  \};\
\
  const paginate = (pageNumber) => setCurrentPage(pageNumber);\
\
  const handleFileUpload = (e) => \{\
    const file = e.target.files[0];\
    if (!file) return;\
    if (!window.XLSX) \{ alert("Excel library is still loading."); return; \}\
    const reader = new FileReader();\
    reader.onload = (evt) => \{\
      try \{\
        const bstr = evt.target.result;\
        const wb = window.XLSX.read(bstr, \{ type: 'binary' \});\
        const wsname = wb.SheetNames[0];\
        const ws = wb.Sheets[wsname];\
        const data = window.XLSX.utils.sheet_to_json(ws);\
        \
        const processYesNo = (val) => \{\
            if (!val) return false;\
            const v = String(val).toLowerCase();\
            return v === 'yes' || v === 'present' || v === 'true';\
        \};\
\
        const newIngredients = data.map((row, index) => (\{\
          id: Date.now() + index, // Ensure unique IDs\
          articleCode: String(row['Article Code'] || ''),\
          name: row['Ingredient Name'] || 'Unknown',\
          category: row['Item Group'] || 'Uncategorized',\
          cost: parseFloat(row['Cost Per Unit']) || 0,\
          baseQty: parseFloat(row['Base']) || 1000,\
          baseUnit: row['Unit'] || 'kg',\
          storeUnit: row['Store Unit'] || '',\
          brand: row['Brand'] || '',\
          origin: row['Origin'] || '',\
          supplier: row['Supplier Name'] || '',\
          stock: 0, // Default for imported items\
          status: 'In Stock',\
          imageType: 'package',\
          images: [],\
          nutrition: \{\
            calories: parseFloat(row['Calories (Kcal)']) || 0,\
            fat: parseFloat(row['Fat (G)']) || 0,\
            satFat: parseFloat(row['Sat Fat (G)']) || 0,\
            transFat: parseFloat(row['Trans Fat (G)']) || 0,\
            cholesterol: parseFloat(row['Cholesterol (Mg)']) || 0,\
            sodium: parseFloat(row['Sodium (Mg)']) || 0,\
            carbs: parseFloat(row['Carb (G)']) || 0,\
            fiber: parseFloat(row['Fiber (G)']) || 0,\
            sugar: parseFloat(row['Sugar (G)']) || 0,\
            protein: parseFloat(row['Protein (G)']) || 0\
          \},\
          allergens: \{\
            'Gluten': processYesNo(row['Gluten']),\
            'Crustacean': processYesNo(row['Crustacean']),\
            'Egg': processYesNo(row['Egg']),\
            'Fish': processYesNo(row['Fish']),\
            'Peanuts': processYesNo(row['Peanuts']),\
            'Soybeans': processYesNo(row['Soybeans']),\
            'Walnuts & Tree Nuts': processYesNo(row['Walnut & Tree Nuts']),\
            'Milk': processYesNo(row['Milk']),\
            'Sulphite': processYesNo(row['Sulphite']),\
            'Celery': processYesNo(row['Celery']),\
            'Mustard': processYesNo(row['Mustard']),\
            'Sesame': processYesNo(row['Sesame']),\
            'Shellfish': processYesNo(row['Shellfish']),\
            'Lupin': processYesNo(row['Lupin']),\
            'Yeast': processYesNo(row['Yeast']),\
            'Mollusca': processYesNo(row['Mollusca']),\
            'Monosodium Glutamate': processYesNo(row['Monosodium Glutamate']),\
            'Cereal': processYesNo(row['Cereal']),\
            'Coconut': processYesNo(row['Coconut']),\
          \},\
          diet: \{\
            'Keto': processYesNo(row['Keto']),\
            'Paleo': processYesNo(row['Paleo']),\
            'Vegan': processYesNo(row['Vegan']),\
            'Vegetarian': processYesNo(row['Vegetarian']),\
            'Gluten Free': processYesNo(row['Gluten Free']),\
          \}\
        \}));\
\
        setIngredients(prev => [...prev, ...newIngredients]);\
        alert(`Successfully imported $\{newIngredients.length\} ingredients!`);\
      \} catch (error) \{\
        console.error("Error reading file:", error);\
        alert("Error parsing file. Please check the format.");\
      \}\
    \};\
    reader.readAsBinaryString(file);\
    // Reset value so same file can be selected again if needed\
    e.target.value = null;\
  \};\
\
  if (viewingIngredient) \{\
    return (\
      <>\
        <IngredientDetailPage \
          ingredient=\{viewingIngredient\}\
          onBack=\{() => setViewingIngredient(null)\}\
          onEdit=\{canEdit ? handleEdit : null\}\
          onDelete=\{canDelete ? handleDelete : null\}\
        />\
        <IngredientModal \
          isOpen=\{isAddModalOpen\} \
          onClose=\{() => setIsAddModalOpen(false)\} \
          ingredient=\{editingIngredient\}\
          onSave=\{handleSave\}\
        />\
      </>\
    );\
  \}\
\
  return (\
    <div className="p-6 space-y-6 max-w-7xl mx-auto flex flex-col h-full">\
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-shrink-0">\
        <div className="flex items-center gap-3 w-full sm:w-auto">\
          <div className="relative flex-1 sm:w-80">\
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />\
            <input type="text" placeholder="Search ingredients..." value=\{searchQuery\} onChange=\{(e) => setSearchQuery(e.target.value)\} className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />\
          </div>\
          <div className="relative">\
            <button onClick=\{() => setShowFilterMenu(!showFilterMenu)\} className=\{`p-2.5 border rounded-lg shadow-sm transition-all $\{activeFilterCount ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-white border-slate-200 text-slate-600'\}`\}>\
                <Filter className="w-4 h-4" />\
            </button>\
            \{showFilterMenu && (\
                <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 py-3 z-20 animate-in fade-in zoom-in-95 duration-200">\
                    <div className="px-4 pb-2 text-xs font-semibold text-slate-400 border-b border-slate-50 mb-2">Filter by Highest Cost</div>\
                    <div className="px-4 py-2 flex gap-2">\
                        <input type="number" min="1" placeholder="Top X Items..." value=\{activeFilterCount\} onChange=\{(e) => setActiveFilterCount(e.target.value)\} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />\
                        \{activeFilterCount && <button onClick=\{() => \{ setActiveFilterCount(''); setShowFilterMenu(false); \}\} className="p-2 bg-red-50 text-red-500 rounded-lg"><X className="w-4 h-4" /></button>\}\
                    </div>\
                </div>\
            )\}\
          </div>\
        </div>\
\
        <div className="flex items-center gap-3 w-full sm:w-auto">\
           <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">\
            <button onClick=\{() => setViewMode('grid')\} className=\{`p-2 rounded-md $\{viewMode === 'grid' ? 'bg-slate-100 text-emerald-600 shadow-sm' : 'text-slate-400'\}`\}><LayoutGrid className="w-4 h-4" /></button>\
            <button onClick=\{() => setViewMode('list')\} className=\{`p-2 rounded-md $\{viewMode === 'list' ? 'bg-slate-100 text-emerald-600 shadow-sm' : 'text-slate-400'\}`\}><ListIcon className="w-4 h-4" /></button>\
          </div>\
          <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>\
          \
          \{/* Conditional Rendering for Import/Add */\}\
          \{canAdd && (\
            <>\
              <input type="file" ref=\{fileInputRef\} onChange=\{handleFileUpload\} accept=".xlsx, .xls, .xlsm" className="hidden" />\
              <button onClick=\{() => fileInputRef.current.click()\} className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-all">\
                <Upload className="w-4 h-4" /> Import Data\
              </button>\
              <button onClick=\{() => \{ setEditingIngredient(null); setIsAddModalOpen(true); \}\} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-all">\
                <Plus className="w-4 h-4" /> Add Ingredient\
              </button>\
            </>\
          )\}\
        </div>\
      </div>\
\
      <div className="flex-1 overflow-auto">\
      \{viewMode === 'list' ? (\
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">\
          <div className="overflow-x-auto">\
            <table className="w-full text-left text-sm">\
              <thead className="bg-slate-50 border-b border-slate-200">\
                <tr>\
                  <th className="px-6 py-4 font-semibold text-slate-700 w-32">Article Code</th>\
                  <th className="px-6 py-4 font-semibold text-slate-700">Ingredient Name</th>\
                  <th className="px-6 py-4 font-semibold text-slate-700">Cost / Unit</th>\
                  <th className="px-6 py-4 font-semibold text-slate-700">Brand</th>\
                  <th className="px-6 py-4 font-semibold text-slate-700">Origin</th>\
                </tr>\
              </thead>\
              <tbody className="divide-y divide-slate-100">\
                \{currentItems.map((item) => (\
                  <tr key=\{item.id\} onClick=\{() => handleView(item)\} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">\
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">\{item.articleCode\}</td>\
                    <td className="px-6 py-4"><div className="font-medium text-slate-900">\{item.name\}</div><div className="text-xs text-slate-400 mt-0.5">\{item.category\}</div></td>\
                    <td className="px-6 py-4 font-medium text-slate-700">\{formatCurrency(item.cost)\} / \{item.baseUnit\}</td>\
                    <td className="px-6 py-4 text-slate-600">\{item.brand\}</td>\
                    <td className="px-6 py-4 text-slate-600">\{item.origin\}</td>\
                  </tr>\
                ))\}\
              </tbody>\
            </table>\
          </div>\
        </div>\
      ) : (\
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">\
          \{currentItems.map((item) => (\
            <div key=\{item.id\} onClick=\{() => handleView(item)\} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col cursor-pointer">\
              <div className="p-5 flex-1">\
                <div className="flex justify-between items-start mb-4">\
                  <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100"><IngredientIcon type=\{item.imageType\} /></div>\
                  <StatusBadge status=\{item.status\} />\
                </div>\
                <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1">\{item.name\}</h3>\
                <p className="text-xs text-slate-500 mb-4">\{item.articleCode\} \'95 \{item.brand\}</p>\
                <div className="grid grid-cols-2 gap-4 text-sm border-t border-slate-100 pt-4">\
                  <div><p className="text-slate-400 text-xs mb-0.5">Origin</p><p className="font-medium text-slate-700">\{item.origin\}</p></div>\
                  <div className="text-right"><p className="text-slate-400 text-xs mb-0.5">Cost Unit</p><p className="font-medium text-emerald-600">\{formatCurrency(item.cost)\}</p></div>\
                </div>\
              </div>\
            </div>\
          ))\}\
        </div>\
      )\}\
      </div>\
\
      \{filteredIngredients.length > itemsPerPage && (\
        <div className="flex justify-center items-center gap-2 mt-4 pb-4 flex-shrink-0">\
          <button onClick=\{() => paginate(currentPage - 1)\} disabled=\{currentPage === 1\} className="px-3 py-1 rounded border text-sm font-medium bg-white text-slate-600">Previous</button>\
          <span className="text-sm text-slate-500">Page \{currentPage\} of \{totalPages\}</span>\
          <button onClick=\{() => paginate(currentPage + 1)\} disabled=\{currentPage === totalPages\} className="px-3 py-1 rounded border text-sm font-medium bg-white text-slate-600">Next</button>\
        </div>\
      )\}\
\
      <IngredientModal isOpen=\{isAddModalOpen\} onClose=\{() => setIsAddModalOpen(false)\} ingredient=\{editingIngredient\} onSave=\{handleSave\} />\
    </div>\
  );\
\}\
\
function RecipesManager(\{ recipes, setRecipes, currentUser \}) \{\
  const [viewMode, setViewMode] = useState('list');\
  const [searchQuery, setSearchQuery] = useState('');\
  const [currentPage, setCurrentPage] = useState(1);\
  const itemsPerPage = 10;\
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);\
  const [viewingIngredient, setViewingIngredient] = useState(null);\
  const [editingIngredient, setEditingIngredient] = useState(null);\
  const [showFilterMenu, setShowFilterMenu] = useState(false);\
  const [activeFilterCount, setActiveFilterCount] = useState(''); \
\
  const canAdd = currentUser.role === 'Administrator' || currentUser.role === 'Contributor';\
  const canEdit = currentUser.role === 'Administrator' || currentUser.role === 'Contributor';\
  const canDelete = currentUser.role === 'Administrator'; \
\
  const filteredIngredients = useMemo(() => \{\
    let result = recipes.filter(item => \
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||\
      item.articleCode.toLowerCase().includes(searchQuery.toLowerCase()) ||\
      item.brand.toLowerCase().includes(searchQuery.toLowerCase())\
    );\
    if (activeFilterCount && !isNaN(activeFilterCount) && Number(activeFilterCount) > 0) \{\
      result.sort((a, b) => b.cost - a.cost);\
      result = result.slice(0, Number(activeFilterCount));\
    \}\
    return result;\
  \}, [recipes, searchQuery, activeFilterCount]);\
\
  useEffect(() => setCurrentPage(1), [searchQuery, activeFilterCount]);\
\
  const indexOfLastItem = currentPage * itemsPerPage;\
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;\
  const currentItems = filteredIngredients.slice(indexOfFirstItem, indexOfLastItem);\
  const totalPages = Math.ceil(filteredIngredients.length / itemsPerPage);\
\
  const handleSave = (data) => \{\
    if (editingIngredient) \{\
      setRecipes(recipes.map(ing => ing.id === data.id ? data : ing));\
      if (viewingIngredient && viewingIngredient.id === data.id) setViewingIngredient(data);\
    \} else \{\
      setRecipes([...recipes, \{ ...data, id: Date.now(), status: 'In Stock', imageType: 'package', images: data.images || [] \}]);\
    \}\
  \};\
\
  const handleDelete = (id) => \{\
    if (window.confirm('Are you sure you want to delete this item?')) \{\
      setRecipes(recipes.filter(i => i.id !== id));\
      setViewingIngredient(null);\
    \}\
  \};\
\
  const handleEdit = (ingredient) => \{\
    setEditingIngredient(ingredient);\
    setIsAddModalOpen(true);\
  \};\
\
  const handleView = (ingredient) => setViewingIngredient(ingredient);\
  const paginate = (pageNumber) => setCurrentPage(pageNumber);\
\
  if (viewingIngredient) \{\
    return (\
      <>\
        <IngredientDetailPage \
          ingredient=\{viewingIngredient\}\
          onBack=\{() => setViewingIngredient(null)\}\
          onEdit=\{canEdit ? handleEdit : null\}\
          onDelete=\{canDelete ? handleDelete : null\}\
        />\
        <IngredientModal isOpen=\{isAddModalOpen\} onClose=\{() => setIsAddModalOpen(false)\} ingredient=\{editingIngredient\} onSave=\{handleSave\} type="recipe" />\
      </>\
    );\
  \}\
\
  return (\
    <div className="p-6 space-y-6 max-w-7xl mx-auto flex flex-col h-full">\
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-shrink-0">\
        <div className="flex items-center gap-3 w-full sm:w-auto">\
          <div className="relative flex-1 sm:w-80">\
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />\
            <input type="text" placeholder="Search recipes..." value=\{searchQuery\} onChange=\{(e) => setSearchQuery(e.target.value)\} className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />\
          </div>\
          <div className="relative">\
            <button onClick=\{() => setShowFilterMenu(!showFilterMenu)\} className=\{`p-2.5 border rounded-lg shadow-sm transition-all $\{activeFilterCount ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-white border-slate-200 text-slate-600'\}`\}>\
                <Filter className="w-4 h-4" />\
            </button>\
            \{showFilterMenu && (\
                <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 py-3 z-20 animate-in fade-in zoom-in-95 duration-200">\
                    <div className="px-4 pb-2 text-xs font-semibold text-slate-400 border-b border-slate-50 mb-2">Filter by Highest Cost</div>\
                    <div className="px-4 py-2 flex gap-2">\
                        <input type="number" min="1" placeholder="Top X Items..." value=\{activeFilterCount\} onChange=\{(e) => setActiveFilterCount(e.target.value)\} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />\
                        \{activeFilterCount && <button onClick=\{() => \{ setActiveFilterCount(''); setShowFilterMenu(false); \}\} className="p-2 bg-red-50 text-red-500 rounded-lg"><X className="w-4 h-4" /></button>\}\
                    </div>\
                </div>\
            )\}\
          </div>\
        </div>\
\
        <div className="flex items-center gap-3 w-full sm:w-auto">\
           <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">\
            <button onClick=\{() => setViewMode('grid')\} className=\{`p-2 rounded-md $\{viewMode === 'grid' ? 'bg-slate-100 text-emerald-600 shadow-sm' : 'text-slate-400'\}`\}><LayoutGrid className="w-4 h-4" /></button>\
            <button onClick=\{() => setViewMode('list')\} className=\{`p-2 rounded-md $\{viewMode === 'list' ? 'bg-slate-100 text-emerald-600 shadow-sm' : 'text-slate-400'\}`\}><ListIcon className="w-4 h-4" /></button>\
          </div>\
          <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>\
          \{canAdd && (\
            <button onClick=\{() => \{ setEditingIngredient(null); setIsAddModalOpen(true); \}\} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-all">\
              <Plus className="w-4 h-4" /> Add Recipe\
            </button>\
          )\}\
        </div>\
      </div>\
\
      <div className="flex-1 overflow-auto">\
      \{viewMode === 'list' ? (\
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">\
          <div className="overflow-x-auto">\
            <table className="w-full text-left text-sm">\
              <thead className="bg-slate-50 border-b border-slate-200">\
                <tr>\
                  <th className="px-6 py-4 font-semibold text-slate-700 w-32">Article Code</th>\
                  <th className="px-6 py-4 font-semibold text-slate-700">Recipe Name</th>\
                  <th className="px-6 py-4 font-semibold text-slate-700">Per Kilo Cost</th>\
                  <th className="px-6 py-4 font-semibold text-slate-700">Prod. Loss</th>\
                  <th className="px-6 py-4 font-semibold text-slate-700">Loss %</th>\
                  <th className="px-6 py-4 font-semibold text-slate-700">Department</th>\
                </tr>\
              </thead>\
              <tbody className="divide-y divide-slate-100">\
                \{currentItems.map((item) => \{\
                   const totalWeight = item.recipeIngredients ? item.recipeIngredients.reduce((acc, curr) => acc + (curr.qty || 0), 0) : 0;\
                   const totalCost = item.recipeIngredients ? item.recipeIngredients.reduce((acc, curr) => acc + (curr.cost || 0), 0) : 0;\
                   const yieldQty = item.yieldQty || 0;\
                   const prodLoss = Math.max(0, totalWeight - yieldQty);\
                   const lossPercent = totalWeight > 0 ? (prodLoss / totalWeight) * 100 : 0;\
                   const perKiloCost = yieldQty > 0 ? (totalCost / (yieldQty / 1000)) : 0;\
                   return (\
                      <tr key=\{item.id\} onClick=\{() => handleView(item)\} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">\
                        <td className="px-6 py-4 font-mono text-xs text-slate-500">\{item.articleCode\}</td>\
                        <td className="px-6 py-4">\
                          <div className="font-medium text-slate-900 group-hover:text-emerald-700 transition-colors">\{item.name\}</div>\
                          <div className="text-xs text-slate-400 mt-0.5">\{item.brand\}</div>\
                        </td>\
                        <td className="px-6 py-4 font-medium text-slate-700">\{formatCurrency(perKiloCost)\}</td>\
                        <td className="px-6 py-4 text-slate-600">\{prodLoss.toFixed(0)\} g</td>\
                        <td className="px-6 py-4 text-red-500 font-medium">\{lossPercent.toFixed(1)\}%</td>\
                        <td className="px-6 py-4 text-slate-600">\{item.category\}</td>\
                      </tr>\
                   );\
                \})\}\
              </tbody>\
            </table>\
          </div>\
        </div>\
      ) : (\
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">\
          \{currentItems.map((item) => \{\
            const totalWeight = item.recipeIngredients ? item.recipeIngredients.reduce((acc, curr) => acc + (curr.qty || 0), 0) : 0;\
            const totalCost = item.recipeIngredients ? item.recipeIngredients.reduce((acc, curr) => acc + (curr.cost || 0), 0) : 0;\
            const yieldQty = item.yieldQty || 0;\
            const perKiloCost = yieldQty > 0 ? (totalCost / (yieldQty / 1000)) : 0;\
            return (\
              <div key=\{item.id\} onClick=\{() => handleView(item)\} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col cursor-pointer">\
                <div className="p-5 flex-1">\
                  <div className="flex justify-between items-start mb-4">\
                    <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100"><IngredientIcon type=\{item.imageType\} /></div>\
                    <StatusBadge status=\{item.status\} />\
                  </div>\
                  <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1">\{item.name\}</h3>\
                  <p className="text-xs text-slate-500 mb-4">\{item.articleCode\} \'95 \{item.brand\}</p>\
                  <div className="grid grid-cols-2 gap-4 text-sm border-t border-slate-100 pt-4">\
                    <div><p className="text-slate-400 text-xs mb-0.5">Per Kilo</p><p className="font-medium text-emerald-600">\{formatCurrency(perKiloCost)\}</p></div>\
                    <div className="text-right"><p className="text-slate-400 text-xs mb-0.5">Department</p><p className="font-medium text-slate-700">\{item.category\}</p></div>\
                  </div>\
                </div>\
              </div>\
            );\
          \})\}\
        </div>\
      )\}\
      </div>\
\
      \{filteredIngredients.length > itemsPerPage && (\
        <div className="flex justify-center items-center gap-2 mt-4 pb-4 flex-shrink-0">\
          <button onClick=\{() => paginate(currentPage - 1)\} disabled=\{currentPage === 1\} className="px-3 py-1 rounded border text-sm font-medium bg-white text-slate-600">Previous</button>\
          <span className="text-sm text-slate-500">Page \{currentPage\} of \{totalPages\}</span>\
          <button onClick=\{() => paginate(currentPage + 1)\} disabled=\{currentPage === totalPages\} className="px-3 py-1 rounded border text-sm font-medium bg-white text-slate-600">Next</button>\
        </div>\
      )\}\
\
      <IngredientModal isOpen=\{isAddModalOpen\} onClose=\{() => setIsAddModalOpen(false)\} ingredient=\{editingIngredient\} onSave=\{handleSave\} type="recipe" />\
    </div>\
  );\
\}\
\
// --- Forecast / Production Planning Component ---\
\
const ForecastManager = (\{ allIngredients = INITIAL_INGREDIENTS, allRecipes = INITIAL_RECIPES \}) => \{\
  const [plan, setPlan] = useState([\
    \{ id: 1, recipeId: 101, mode: 'batches', qty: 5 \} \
  ]);\
  const [searchQuery, setSearchQuery] = useState('');\
\
  const requirements = useMemo(() => \{\
    const materials = \{\};\
    const subRecipes = \{\};\
    plan.forEach(planItem => \{\
      const recipe = allRecipes.find(r => r.id === planItem.recipeId);\
      if (!recipe) return;\
      const factor = planItem.mode === 'batches' ? planItem.qty : (planItem.qty / (recipe.yieldQty || 1));\
      recipe.recipeIngredients.forEach(ing => \{\
        const isSubRecipe = allRecipes.some(r => r.articleCode === ing.articleCode);\
        if (isSubRecipe) \{\
          if (!subRecipes[ing.articleCode]) subRecipes[ing.articleCode] = \{ ...ing, totalQty: 0, name: ing.name \};\
          subRecipes[ing.articleCode].totalQty += (ing.qty * factor);\
        \} else \{\
          if (!materials[ing.articleCode]) \{\
            const stockItem = allIngredients.find(i => i.articleCode === ing.articleCode);\
            materials[ing.articleCode] = \{ ...ing, totalQty: 0, name: ing.name, stock: stockItem ? stockItem.stock : 0, baseUnit: stockItem ? stockItem.baseUnit : 'units' \};\
          \}\
          materials[ing.articleCode].totalQty += (ing.qty * factor);\
        \}\
      \});\
    \});\
    return \{ materials, subRecipes \};\
  \}, [plan, allRecipes, allIngredients]);\
\
  const addToPlan = (recipe) => \{\
    setPlan([...plan, \{ id: Date.now(), recipeId: recipe.id, mode: 'batches', qty: 1 \}]);\
    setSearchQuery('');\
  \};\
\
  const removeFromPlan = (id) => setPlan(plan.filter(item => item.id !== id));\
  const updatePlanItem = (id, field, value) => setPlan(plan.map(item => item.id === id ? \{ ...item, [field]: value \} : item));\
  const filteredRecipes = searchQuery ? allRecipes.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase())) : [];\
\
  return (\
    <div className="flex flex-col h-full bg-slate-50 animate-in fade-in duration-300">\
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">\
        <div><h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Activity className="w-5 h-5 text-emerald-600" /> Production Forecast</h2></div>\
        <div className="flex gap-3">\
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm"><FileText className="w-4 h-4" /> Export Plan</button>\
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium text-sm shadow-sm"><Check className="w-4 h-4" /> Commit</button>\
        </div>\
      </div>\
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">\
        <div className="flex-1 overflow-y-auto p-6 border-r border-slate-200 min-w-[50%]">\
          <div className="max-w-2xl mx-auto space-y-6">\
            <div className="relative z-20">\
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Add to Plan</label>\
              <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Search recipe..." value=\{searchQuery\} onChange=\{e => setSearchQuery(e.target.value)\} /></div>\
              \{searchQuery && (\
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">\
                  \{filteredRecipes.length > 0 ? filteredRecipes.map(recipe => (\
                    <button key=\{recipe.id\} onClick=\{() => addToPlan(recipe)\} className="w-full text-left px-4 py-3 hover:bg-slate-50 flex justify-between items-center border-b border-slate-50 last:border-0"><span className="font-medium text-slate-700">\{recipe.name\}</span><Plus className="w-4 h-4 text-emerald-600" /></button>\
                  )) : <div className="p-4 text-slate-400 text-sm italic">No recipes found.</div>\}\
                </div>\
              )\}\
            </div>\
            <div className="space-y-3">\
               \{plan.map((item) => \{\
                 const recipe = allRecipes.find(r => r.id === item.recipeId);\
                 if(!recipe) return null;\
                 return (\
                   <div key=\{item.id\} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between group">\
                      <div className="flex items-center gap-3"><div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center"><ChefHat className="w-5 h-5" /></div><div><h4 className="font-bold text-slate-800">\{recipe.name\}</h4><p className="text-xs text-slate-500">Yield: \{recipe.yieldQty\}g</p></div></div>\
                      <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg border border-slate-200">\
                         <select value=\{item.mode\} onChange=\{(e) => updatePlanItem(item.id, 'mode', e.target.value)\} className="bg-transparent text-xs font-bold text-slate-600 uppercase px-2 outline-none cursor-pointer"><option value="batches">Batches</option><option value="weight">Total (g)</option></select>\
                         <div className="w-px h-4 bg-slate-300"></div>\
                         <input type="number" min="0" value=\{item.qty\} onChange=\{(e) => updatePlanItem(item.id, 'qty', Number(e.target.value))\} className="w-20 bg-transparent text-sm font-bold text-center outline-none" />\
                      </div>\
                      <button onClick=\{() => removeFromPlan(item.id)\} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>\
                   </div>\
                 );\
               \})\}\
            </div>\
          </div>\
        </div>\
        <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6">\
          <div className="max-w-2xl mx-auto space-y-8">\
            <div className="grid grid-cols-2 gap-4">\
               <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Recipes</div><div className="text-2xl font-black text-slate-800">\{plan.length\}</div></div>\
               <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Ingredients</div><div className="text-2xl font-black text-slate-800">\{Object.keys(requirements.materials).length\}</div></div>\
            </div>\
            <div>\
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Box className="w-4 h-4" /> Requirements</h3>\
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">\
                <table className="w-full text-sm text-left">\
                  <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-semibold border-b border-slate-100"><tr><th className="px-4 py-3">Ingredient</th><th className="px-4 py-3 text-right">Req</th><th className="px-4 py-3 text-right">Stock</th><th className="px-4 py-3 text-center">Stat</th></tr></thead>\
                  <tbody className="divide-y divide-slate-100">\
                    \{Object.values(requirements.materials).map((mat, idx) => \{\
                      const stockInRecipeUnit = (mat.baseUnit === 'kg' || mat.baseUnit === 'L') ? mat.stock * 1000 : mat.stock;\
                      const isShort = stockInRecipeUnit < mat.totalQty;\
                      return (\
                        <tr key=\{idx\} className=\{isShort ? "bg-red-50/30" : ""\}>\
                          <td className="px-4 py-3 font-medium text-slate-700">\{mat.name\}</td>\
                          <td className="px-4 py-3 text-right font-bold text-slate-700">\{mat.totalQty.toFixed(0)\}</td>\
                          <td className="px-4 py-3 text-right text-slate-600">\{stockInRecipeUnit.toFixed(0)\}</td>\
                          <td className="px-4 py-3 text-center">\{isShort ? <span className="text-xs font-bold text-red-600">Short</span> : <span className="text-emerald-600"><Check className="w-4 h-4 mx-auto" /></span>\}</td>\
                        </tr>\
                      );\
                    \})\}\
                  </tbody>\
                </table>\
              </div>\
            </div>\
          </div>\
        </div>\
      </div>\
    </div>\
  );\
\};}