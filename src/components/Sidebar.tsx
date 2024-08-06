import Link from 'next/link';

function Sidebar() {
  return (
    <div className="bg-white text-white p-5">
      <ul className="gap-5 flex lg:flex-col">
        <li className="hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 rounded-md bg-[#2991EE]">
          <Link href="/create-chatbot">Link</Link>
        </li>
        <li className="hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 rounded-md bg-[#2991EE]">
          <Link href="/view-chatbots">Link</Link>
        </li>
        <li className="hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 rounded-md bg-[#2991EE]">
          <Link href="/review-sessions">Link</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
