'use client';
import Table from './Table';
import Pagination from './Pagination';
import { usePagination } from '@/hooks/usePagination';
import Link from 'next/link';

export default function PostsTable({ posts }) {
  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
  } = usePagination(posts, 5);

  return (
    <>
      <Table columns={['#', 'Title', 'Content', 'Action']}>
        {paginatedData.map((post, index) => (
          <tr key={post._id} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="py-3 px-6">{(currentPage - 1) * 5 + index + 1}</td>
            <td className="py-3 px-6">{post.title}</td>
            <td className="py-3 px-6">{post.content}</td>
            <td className="py-3 px-6">
                <Link className='btn-sm' href={`/posts/edit/${post._id.toString()}`}>Edit</Link>
                <Link className='btn-sm-green' href={`/posts/show/${post._id.toString()}`}>View</Link>
                {/* <Link className='btn-sm-red' href="">Delete</Link> */}
            </td>
          </tr>
        ))}
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
    </>
  );
}
