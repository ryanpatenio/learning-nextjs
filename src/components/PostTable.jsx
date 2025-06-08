'use client';
import Table from './Table';
import Pagination from './Pagination';
import { usePagination } from '@/hooks/usePagination';
import Link from 'next/link';
import { deletePost } from '@/actions/post';
import { useActionState, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function PostsTable({ posts }) {
  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
  } = usePagination(posts, 5);
 
  const [submittingId, setSubmittingId] = useState(null);
  const [state, deleteAction, isPending] = useActionState(deletePost, undefined);
  const router = useRouter();

  useEffect(() => {
      if (state?.message) {
          if (state.type === 'error') {
          toast.error(state.message);
          } else {
          toast.success(state.message);
           router.refresh();
                       
        }
      }
  }, [state]);
  
  
  return (
    <>
           <Table columns={['#', 'Title', 'Content', 'Action']}>
        {paginatedData.map((post, index) => {
         return (
            <tr key={post._id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6">{(currentPage - 1) * 5 + index + 1}</td>
              <td className="py-3 px-6">{post.title}</td>
              <td className="py-3 px-6">{post.content}</td>
              <td className="custom-td-action space-x-2">
                <Link className="btn-sm" href={`/posts/edit/${post._id}`}>Edit</Link>
                <Link className="btn-sm-green" href={`/posts/show/${post._id}`}>View</Link>
                <form action={deleteAction}>
                  <input type="hidden" name="postId" value={post._id} />
                  <button
                    className="btn-sm-red"
                    disabled={isPending && submittingId === post._id}
                    onClick={() => setSubmittingId(post._id)}
                  >
                    {isPending && submittingId === post._id ? 'Deleting...' : 'Delete'}
                  </button>
                </form>
              </td>
            </tr>
          );
        })}
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
    </>
  );
}
