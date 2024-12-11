<script lang="ts">
	import { MONTHS } from '$lib/constants/month'
	import type { Payment } from '$lib/server/schemas/payments'
	import { formatter } from '$lib/utils/formatter'
	import { CheckIcon, XIcon, PenIcon } from 'lucide-svelte'
	import { twMerge } from 'tailwind-merge'

	const { month, payments }: { month: number; payments: Payment[] } = $props()

	let open = $state(false)

	const total = $derived(payments.reduce((acc, payment) => acc + payment.sum, 0))

	const totalOriginal = $derived(
		payments.reduce(
			(acc, payment) => {
				if (!payment.originalCurrency) return acc
				acc[payment.originalCurrency] += payment.originalSum || 0
				return acc
			},
			{ EUR: 0, USD: 0 },
		),
	)

	let editedPayment: Payment['id'] | undefined = $state()
</script>

<div
	class={twMerge(
		'd-collapse rounded-xl border-[1px] border-base-200 bg-base-200 hover:border-primary',
		open && 'border-primary',
	)}
>
	<input type="checkbox" class="min-h-[40px]" bind:checked={open} />
	<div class="text-md d-collapse-title flex min-h-[40px] justify-between py-2 font-medium">
		<div>{MONTHS[month]}</div>
		<div class="flex gap-8">
			<span>
				{formatter('UAH').format(total)}
			</span>
			<span>/</span>
			<span>
				{formatter('EUR').format(totalOriginal.EUR)}
			</span>
			<span>-</span>
			<span>
				{formatter('USD').format(totalOriginal.USD)}
			</span>
		</div>
	</div>
	<div class="d-collapse-content flex gap-2">
		<div class="flex-1">
			{#each payments as payment}
				<div class="flex items-center gap-2">
					<div class="text-xl">{formatter('UAH').format(payment.sum)}</div>
					<button
						type="button"
						class="d-btn d-btn-square d-btn-sm ml-4"
						onclick={() => (editedPayment = payment.id)}
					>
						<PenIcon size="16" />
					</button>
					<form action="?/delete" method="post">
						<input type="hidden" name="id" value={payment.id} />
						<button type="submit" class="d-btn d-btn-square d-btn-sm">
							<XIcon size="16" />
						</button>
					</form>
				</div>
			{/each}
		</div>
		<form
			class="flex flex-1 flex-col gap-2"
			method="post"
			action="?/{editedPayment ? 'update' : 'insert'}"
		>
			<input name="id" type="hidden" value={editedPayment} />
			<input
				name="sum"
				type="text"
				class="d-input-sm d-input-bordered d-input-primary d-input block w-full"
				required
				value={editedPayment ? payments.find((payment) => payment.id === editedPayment)?.sum : ''}
			/>
			<input
				name="date"
				type="date"
				class="d-input-sm d-input-bordered d-input-primary d-input block w-full"
				required
				value={editedPayment ? payments.find((payment) => payment.id === editedPayment)?.date : ''}
			/>
			<input
				name="originalSum"
				type="text"
				class="d-input-sm d-input-bordered d-input-primary d-input block w-full"
				value={editedPayment
					? payments.find((payment) => payment.id === editedPayment)?.originalSum
					: ''}
			/>
			<select
				name="originalCurrency"
				class="d-select d-select-sm d-select-bordered"
				value={editedPayment
					? payments.find((payment) => payment.id === editedPayment)?.originalCurrency
					: ''}
			>
				<option value="EUR">EUR</option>
				<option value="USD">USD</option>
			</select>
			<div class="flex gap-2">
				<button type="submit" class="d-btn d-btn-square d-btn-sm ml-auto">
					<CheckIcon size="16" />
				</button>
				<button
					type="reset"
					class="d-btn d-btn-square d-btn-sm"
					onclick={() => (editedPayment = undefined)}
				>
					<XIcon size="16" />
				</button>
			</div>
		</form>
	</div>
</div>
