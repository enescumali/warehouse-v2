function LoadingState({type = 'article'}) {

    return (
        type === 'article' 
            ?  <div className="rounded-md w-full mb-6">
                    <div className="animate-pulse flex">
                        <div className="flex-1 py-1">
                            <div className="bg-gray-400 h-4 mb-2 rounded w-24"></div>
                            <div className="bg-gray-200 h-4 rounded w-48"></div>
                        </div>
                    </div>
                </div> 
            :   <div>
                    <div className="rounded-md w-full mb-8">
                        <div className="animate-pulse flex">
                            <div className="flex-1 space-y-4 py-1">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md w-full mb-8">
                        <div className="animate-pulse flex">
                            <div className="flex-1 space-y-4 py-1">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md w-full mb-8">
                        <div className="animate-pulse flex">
                            <div className="flex-1 space-y-4 py-1">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
    )
}

export default LoadingState;
