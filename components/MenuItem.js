import React from 'react';

const MenuItem = React.memo(({ item }) => {
  const getDietaryBadgeColor = (dietary) => {
    const colors = {
      vegetarian: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      vegan: 'bg-green-50 text-green-700 border-green-200',
      'gluten-free': 'bg-blue-50 text-blue-700 border-blue-200',
      'gluten-free-options': 'bg-indigo-50 text-indigo-700 border-indigo-200'
    };
    return colors[dietary] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const formatDietary = (dietary) => {
    return dietary.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  // Build dietary array from various sources
  const buildDietaryInfo = () => {
    const dietaryInfo = [...(item.dietary || [])];
    
    if (item.isVegetarian) {
      dietaryInfo.push('vegetarian');
    }
    
    return [...new Set(dietaryInfo)]; // Remove duplicates
  };

  const dietaryInfo = buildDietaryInfo();

  // Get category-based icon
  const getCategoryIcon = () => {
    const category = item.category?.toLowerCase() || '';
    if (category.includes('pizza')) return '🍕';
    if (category.includes('dessert') || category.includes('حلويات')) return '🧁';
    if (category.includes('beverage') || category.includes('مشروبات')) return '☕';
    if (category.includes('manakish') || category.includes('مناقيش')) return '🥖';
    if (category.includes('pastries') || category.includes('معجنات')) return '🥐';
    return '🍽️';
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 mb-4 shadow-sm hover:shadow-md transition-all duration-200 hover:border-menu-accent-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3">
          {/* Category Icon */}
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-menu-accent-50 to-menu-accent-100 rounded-full flex items-center justify-center text-xl">
            {getCategoryIcon()}
          </div>
          
          {/* Item Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900 leading-tight">
                {item.name}
                {item.popular && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                    ⭐ Popular
                  </span>
                )}
              </h3>
            </div>
            
            {item.description && (
              <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                {item.description}
              </p>
            )}

            {item.description2 && (
              <p className="text-gray-500 leading-relaxed mb-3 text-xs italic">
                {item.description2}
              </p>
            )}

            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {item.prepTime && (
                <span className="inline-flex items-center px-2.5 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-medium border border-gray-200">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item.prepTime}
                </span>
              )}
              
              {dietaryInfo.length > 0 && dietaryInfo.map((diet) => (
                <span
                  key={diet}
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getDietaryBadgeColor(diet)}`}
                >
                  {diet === 'vegetarian' && '🌱'}
                  {diet === 'vegan' && '🌿'}
                  {diet.includes('gluten') && '🌾'}
                  <span className="ml-1">{formatDietary(diet)}</span>
                </span>
              ))}
            </div>

            {item.allergens && item.allergens.length > 0 && (
              <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
                <span className="font-medium">⚠️ Allergens:</span> {item.allergens.join(', ')}
              </div>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex-shrink-0 ml-4">
          <div className="bg-gradient-to-r from-menu-accent-500 to-menu-accent-600 text-white px-4 py-2 rounded-xl shadow-sm">
            <span className="text-lg font-bold">
              {item.price}
            </span>
            <span className="text-xs opacity-90 ml-1">LL</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MenuItem;
