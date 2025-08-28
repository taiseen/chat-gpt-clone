import { useRouteError } from "react-router-dom";

const RootPageError = () => {
    const error = useRouteError();

    // Safely extract and split stack trace
    const stackLines = error?.stack?.split("\n") || [];

    // Render stack trace specific location...
    const stackLine = stackLines
        .slice(1, 2)
        .map((line, idx) => {

            const fileUrl = line?.split("?")[0];
            const file = fileUrl?.split("/")?.pop()?.split(":")?.[0];

            return (
                <p key={idx} className="text-red-300 text-xl m-0">
                    File Path:- {fileUrl.trim()}
                    <br />
                    File Name:-
                    <span className="bg-yellow-500 text-slate-900 mx-1 pb-0.5 px-1  rounded">
                        {file}
                    </span>
                </p>
            )
        });

    return (
        <div className="min-h-screen p-10 text-center text-red-400 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

            <h1 className="animate-pulse text-3xl font-bold mb-4 flex items-center justify-center gap-1">
                🚨 <span className="mt-2">Ops... Unexpected Error...</span>
            </h1>

            <p className="text-xl text-yellow-500 font-semibold">
                {error?.message || "Something went wrong."}
            </p>

            <div className="text-left mt-6 px-5 py-4 bg-slate-800 border border-slate-700/50 shadow drop-shadow rounded-lg space-y-3 flex items-center justify-between">
                {stackLine.length > 0 ? stackLine : (
                    <p className="text-red-400 text-xl m-0">
                        No stack trace available.
                    </p>
                )}

                <button
                    role="button"
                    title="Reload"
                    type="button"
                    className="p-1 bg-slate-500 rounded cursor-pointer hover:bg-slate-600 duration-300 text-2xl"
                    onClick={() => window.location.reload()}
                >
                    🔄
                </button>
            </div>

            {/* 🔍 View Raw Error Toggle */}
            {error?.stack && (
                <details className="mt-6 text-left mx-auto">
                    <summary className="pl-0.5 cursor-pointer text-slate-300 hover:text-white transition-colors">
                        💡 Click to view full error details (for developers)
                    </summary>
                    <div className="mt-4 p-5 bg-slate-900 border border-slate-600 rounded-lg overflow-auto max-h-96">
                        <h3 className="text-red-300 font-bold mb-2">📋 Full Error Stack</h3>
                        <pre className="text-sm text-slate-300/70 whitespace-pre-wrap break-words font-mono">
                            {error.stack}
                        </pre>

                        {error?.cause && (
                            <>
                                <h3 className="text-orange-300 font-bold mt-4 mb-2">❗ Cause</h3>
                                <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono">
                                    {error.cause instanceof Error
                                        ? error.cause.stack
                                        : JSON.stringify(error.cause, null, 2)
                                    }
                                </pre>
                            </>
                        )}
                    </div>
                </details>
            )}
        </div>
    );
}

export default RootPageError