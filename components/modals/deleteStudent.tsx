import Swal from 'sweetalert2';
import deleteUser from '@/libs/user/deleteUser';


export const confirmDelete = async (sid: number) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    })

    console.log(sid)

    Swal.fire({
        title: 'แน่ใจนะ?',
        icon: 'warning',
        showCancelButton: true ,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const isSuccess: boolean = await deleteUser(sid)

            if (isSuccess) Toast.fire({ icon: 'success', title: 'Done!' })
                return isSuccess
        }
      }
    )
    
}