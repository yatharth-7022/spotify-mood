function BackForwardButton() {
  return (
    <div className="flex h-full w-[10%] items-center gap-4">
      <button className="rounded-full bg-[#131313] px-3 py-1 text-xl text-white">
        &lt;
      </button>
      <button className="rounded-full bg-[#131313] px-3 py-1 text-xl text-white">
        &gt;
      </button>
    </div>
  );
}

export default BackForwardButton;
