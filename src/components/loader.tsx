// components/Loader.tsx
export default function Loader() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center h-full bg-zinc-800 bg-opacity-80 z-50">
      <div className="border-t-4 border-emerald-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  )
}
